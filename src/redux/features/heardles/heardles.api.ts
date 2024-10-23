// import api from '@/redux/api/apiSlice';

// const adminApi = api.injectEndpoints({
//     endpoints: (build: any) => ({
//         getAllHeardles: build.query({
//             query: () => `/heardle`
//         }),
//         updateHeardle: build.mutation({
//             query: ({ data, id, token }: any) => ({
//                 url: `/heardle/${id}`,
//                 method: 'PUT',
//                 body: data,
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             }),
//         }),
//         deleteHeardle: build.mutation({
//             query: ({ id, token }: any) => ({
//                 url: `/heardle/${id}`,
//                 method: 'DELETE',
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             }),
//         }),
//     }),
// });

// export const {
//     useGetAllHeardlesQuery,
//     useUpdateHeardleMutation,
//     useDeleteHeardleMutation
// } = adminApi;


import api from '@/redux/api/apiSlice';
import { tagTypes } from '@/redux/tag-types';

const adminApi = api.injectEndpoints({
    endpoints: (build) => ({
        getAllHeardles: build.query<any, void>({
            query: () => `/heardle`,
            providesTags: (result) => {
                if (Array.isArray(result)) {
                    return [
                        ...result.map(({ id }) => ({ type: tagTypes.heardle, id })),
                        { type: tagTypes.heardle, id: 'LIST' },
                    ];
                }
                return [{ type: tagTypes.heardle, id: 'LIST' }];

            },
        }),
        addHeardle: build.mutation<any, { data: any, token: string }>({
            query: ({ data, token }) => ({
                url: `/heardle`,
                method: 'POST',
                body: data,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
            invalidatesTags: ({ id }) => [
                { type: tagTypes.heardle, id },
                { type: tagTypes.heardle, id: 'LIST' },
            ],
        }),
        updateHeardle: build.mutation<any, { data: any, id: string, token: string }>({
            query: ({ data, id, token }) => ({
                url: `/heardle/${id}`,
                method: 'PUT',
                body: data,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: tagTypes.heardle, id },
                { type: tagTypes.heardle, id: 'LIST' },
            ],
        }),
        deleteHeardle: build.mutation<any, { id: string, token: string }>({
            query: ({ id, token }) => ({
                url: `/heardle/${id}`,
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: tagTypes.heardle, id },
                { type: tagTypes.heardle, id: 'LIST' },
            ],
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetAllHeardlesQuery,
    useUpdateHeardleMutation,
    useDeleteHeardleMutation,
    useAddHeardleMutation
} = adminApi;

export default adminApi;
