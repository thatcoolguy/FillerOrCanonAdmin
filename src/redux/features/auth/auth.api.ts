import api from '@/redux/api/apiSlice';
import { tagTypes } from '@/redux/tag-types';

const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    loginAdmin: build.mutation({
      query: (data) => ({
        url: `auth/admin-login`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [tagTypes.auth],
    }),

    deleteUser: build.mutation({
      query: ({ id, token }) => ({
        url: `/auths/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: `${token}`,
        },
      }),
      invalidatesTags: [tagTypes.auth],
    }),
  }),
});

export const { useLoginAdminMutation, useDeleteUserMutation } = authApi;
