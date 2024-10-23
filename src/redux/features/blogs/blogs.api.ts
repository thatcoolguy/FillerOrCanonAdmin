import api from '@/redux/api/apiSlice';
import { tagTypes } from '@/redux/tag-types';

const blogApi = api.injectEndpoints({
    endpoints: (build) => ({
        getAllblogs: build.query<any, void>({
            query: () => `/blog/all`,
            providesTags: (result) => {
                if (Array.isArray(result)) {
                    return [
                        ...result.map(({ id }) => ({ type: tagTypes.blog, id })),
                        { type: tagTypes.blog, id: 'LIST' },
                    ];
                }
                return [{ type: tagTypes.blog, id: 'LIST' }];

            },
        }),
        getBlogById: build.query({
            query: (id) => `/blog/${id}`,
            providesTags: (result, error, id) => [{ type: tagTypes.blog, id }],
        }),
        addBlog: build.mutation<any, { data: any, token: string }>({
            query: ({ data, token }) => ({
                url: `/blog/add`,
                method: 'POST',
                body: data,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
            invalidatesTags: ({ id }) => [
                { type: tagTypes.blog, id },
                { type: tagTypes.blog, id: 'LIST' },
            ],
        }),
        updateBlog: build.mutation<any, { data: any, id: string, token: string }>({
            query: ({ data, id, token }) => ({
                url: `/blog/edit/${id}`,
                method: 'PUT',
                body: data,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: tagTypes.blog, id },
                { type: tagTypes.blog, id: 'LIST' },
            ],
        }),
        deleteBlog: build.mutation<any, { id: string, token: string }>({
            query: ({ id, token }) => ({
                url: `/blog/delete/${id}`,
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: tagTypes.blog, id },
                { type: tagTypes.blog, id: 'LIST' },
            ],
        }),
    }),
    overrideExisting: false,
});

export const {
    useDeleteBlogMutation,
    useAddBlogMutation,
    useUpdateBlogMutation,
    useGetAllblogsQuery,
    useGetBlogByIdQuery
} = blogApi;

export default blogApi;
