/* eslint-disable no-param-reassign */
import NextAuth from 'next-auth';
import axios from 'axios';
import CredentialsProvider from 'next-auth/providers/credentials';
import { jwtDecode } from 'jwt-decode';
import { NextApiRequest, NextApiResponse } from 'next';

const providers = [
  CredentialsProvider({
    name: 'Credentials',
    credentials: {
      email: { label: 'email', type: 'text' },
      password: { label: 'Password', type: 'password' },
    },
    // @ts-ignore
    authorize: async (
      credentials: { email: string; password: string },
      _req: any,
    ): Promise<{
      status: string;
      data: { token: any; email: string; role: string; id: string };
    } | null> => {
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/admin-login`,
          {
            email: credentials.email,
            password: credentials.password,
          },
        );

        // console.log(res);

        if (res.data) {
          const user: {
            token: any;
            email: string;
            role: string;
            id: string;
            name: string;
            image: string;
          } = jwtDecode(res.data.data.token);
          // console.log(user);

          user.token = res.data.data.token;
          user.name = user.email;
          user.id = user.id.toString();
          // user.image = user.avater;
          return { status: 'success', data: user };
        }

        return null;
      } catch (e: any) {
        throw new Error(e.response.data.message);
      }
    },
  }),
];

const callbacks = {
  jwt: ({ token, user, trigger, session }: any) => {

    if (trigger === 'update') {
      // eslint-disable-next-line no-param-reassign
      token = { ...token, ...session };
    }

    if (user) {
      // eslint-disable-next-line no-param-reassign
      token = { ...token, ...user.data };
    }

    return token;
  },
  session: ({ session, token }: any) => {
    // console.log(session);

    if (token) {
      // eslint-disable-next-line no-param-reassign
      session = { ...session, user: token };
    }

    return session;
  },
};

const options = {
  providers,
  callbacks,
  session: {
    // maxAge: 2 * 24 * 60 * 60,
    maxAge: 172798,
  },

  pages: {
    signIn: '/sign-in',
    error: '/sign-in',
  },
};

const authHandler = (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options);

export default authHandler;

