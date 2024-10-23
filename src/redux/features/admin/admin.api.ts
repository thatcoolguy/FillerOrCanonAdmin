import api from '@/redux/api/apiSlice';
import { tagTypes } from '@/redux/tag-types';

const adminApi = api.injectEndpoints({
  endpoints: (build: any) => ({
    addNewAdmin: build.mutation({
      query: ({ data, token }: any) => ({
        url: '/auth/admin',
        method: 'POST',
        body: data,
        headers: {
          Authorization: `${token}`,
        },
      }),
      invalidatesTags: [tagTypes.admin],
    }),

    updateAdmin: build.mutation({
      query: ({ data, id, token }: any) => ({
        url: `/auth/admin/${id}`,
        method: 'PATCH',
        body: data,

        headers: {
          Authorization: `${token}`,
        },

        contentType: 'multipart/form-data',
      }),
      invalidatesTags: [tagTypes.admin],
    }),

    getSingleAdmin: build.query({
      query: (id: string | null) => `/auth/admin/${id}`,
      invalidatesTags: [tagTypes.admin],
    }),

    getAllAdmins: build.query({
      query: (query: any, token: any) => ({
        url: `/auth/admin?${query}`,
        method: 'GET',
        headers: {
          Authorization: `${token}`,
        },
      }),
      providesTags: [tagTypes.admin],
    }),
    updateAdminRole: build.mutation({
      query: ({ data, id, token }: any) => ({
        url: `/auth/admin/${id}/role`,
        method: 'PATCH',
        body: data,
        headers: {
          Authorization: `${token}`,
        },
      }),
      invalidatesTags: [tagTypes.admin],
    }),
    deleteAdmin: build.mutation({
      query: ({ id, token }: any) => ({
        url: `/auth/admin/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: `${token}`,
        },
      }),
      invalidatesTags: [tagTypes.admin],
    }),
  }),
});

export const {
  useAddNewAdminMutation,
  useGetSingleAdminQuery,
  useUpdateAdminMutation,
  useGetAllAdminsQuery,
  useUpdateAdminRoleMutation,
  useDeleteAdminMutation,
} = adminApi;
