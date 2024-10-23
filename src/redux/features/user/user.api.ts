import api from '@/redux/api/apiSlice';
import { tagTypes } from '@/redux/tag-types';

const userApi = api.injectEndpoints({
  endpoints: (build: any) => ({
    addNewUser: build.mutation({
      query: ({ data, token }: any) => ({
        url: '/users',
        method: 'POST',
        body: data,
        headers: {
          Authorization: `${token}`,
        },
      }),
      invalidatesTags: [tagTypes.user],
    }),

    updateUser: build.mutation({
      query: ({ data, id, token }: any) => ({
        url: `/users/${id}`,
        method: 'PATCH',
        body: data,

        headers: {
          Authorization: `${token}`,
        },

        contentType: 'multipart/form-data',
      }),
      invalidatesTags: [tagTypes.user],
    }),

    getSingleUser: build.query({
      query: (id: string | null) => `/users/${id}`,
      invalidatesTags: [tagTypes.user],
    }),

    getAllUsers: build.query({
      query: (query: any, token: any) => ({
        url: `/users?${query}`,
        method: 'GET',
        headers: {
          Authorization: `${token}`,
        },
      }),
      providesTags: [tagTypes.user],
    }),

    getUsersAsOptions: build.query({
      query: () => '/users/options',
      providesTags: [tagTypes.user],
    }),
    updateUserRole: build.mutation({
      query: ({ data, id, token }: any) => ({
        url: `/users/${id}/role`,
        method: 'PATCH',
        body: data,
        headers: {
          Authorization: `${token}`,
        },
      }),
      invalidatesTags: [tagTypes.user],
    }),
    deleteUser: build.mutation({
      query: ({ id, token }: any) => ({
        url: `/users/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: `${token}`,
        },
      }),
      invalidatesTags: [tagTypes.user],
    }),
  }),
});

export const {
  useAddNewUserMutation,
  useGetSingleUserQuery,
  useUpdateUserMutation,
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
  useDeleteUserMutation,
  useGetUsersAsOptionsQuery,
} = userApi;
