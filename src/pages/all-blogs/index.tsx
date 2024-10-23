// pages/admin.js

import { useEffect } from 'react';
import Link from 'next/link';
import { useDeleteBlogMutation, useGetAllblogsQuery } from '@/redux/features/blogs/blogs.api';
import { useSession } from 'next-auth/react';
import { toast } from '@/components/ui/use-toast';

type SessionUser = {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    token?: any;
};
function Page() {
    const { data: allBlogs, isLoading } = useGetAllblogsQuery();
    const [deleteBlog] = useDeleteBlogMutation();
    const { data: session } = useSession();


    useEffect(() => {
    }, []);

    const deleteBlogHandler = async (id: string) => {
        const token = (session?.user as SessionUser)?.token;
        try {
            await deleteBlog({ id, token });
            toast({
                title: 'Blog has been Deleted.',
            });
        } catch (error) {
            toast({
                title: 'Faild to delete blog!',
            });
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-6 shadow-md rounded-md">
            <h1 className="text-3xl font-bold mb-6 text-center">Manage Blogs</h1>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr>
                            <th className="px-6 py-3  text-left text-xs font-medium uppercase tracking-wider">
                                Title
                            </th>
                            <th className="px-6 py-3  text-left text-xs font-medium uppercase tracking-wider">
                                Slug
                            </th>
                            <th className="px-6 py-3  text-left text-xs font-medium uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {allBlogs.map((blog: any) => (
                            <tr key={blog._id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium ">{blog.blog_title}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm">{blog.blog_slug}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <Link href={`/all-blogs/edit-blog?id=${blog.blog_slug}`} className="text-indigo-600 hover:text-indigo-900">
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => deleteBlogHandler(blog._id)}
                                        className="ml-4 text-red-600 hover:text-red-900"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
Page.layout = 'dashboard';
export default Page;
