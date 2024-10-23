import api from '@/redux/api/apiSlice';
import { tagTypes } from '@/redux/tag-types';

const adminApi = api.injectEndpoints({
    endpoints: (build) => ({
        getAllMetaData: build.query<any, void>({
            query: () => `/meta`,
            providesTags: [{ type: tagTypes.MetaData, id: 'LIST' }],
        }),
        addMetaData: build.mutation<any, { data: any, token: string }>({
            query: ({ data, token }) => ({
                url: `/meta/add`,
                method: 'POST',
                body: data,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
            // Invalidate the tag to refetch data
            invalidatesTags: [{ type: tagTypes.MetaData, id: 'LIST' }],
        }),
        updateMetadata: build.mutation<any, { data: any, id: string, token: string }>({
            query: ({ data, id, token }) => ({
                url: `/meta/edit/${id}`,
                method: 'PUT',
                body: data,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
            // Invalidate the tag to refetch data
            invalidatesTags: [{ type: tagTypes.MetaData, id: 'LIST' }],
        }),
        deleteMetaData: build.mutation<any, { id: string, token: string }>({
            query: ({ id, token }) => ({
                url: `/meta/delete/${id}`,
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
            // Invalidate the tag to refetch data
            invalidatesTags: [{ type: tagTypes.MetaData, id: 'LIST' }],
        }),
    }),
    overrideExisting: false,
});

export const {
   useAddMetaDataMutation,
   useDeleteMetaDataMutation,
   useUpdateMetadataMutation,
   useGetAllMetaDataQuery
} = adminApi;

export default adminApi;
