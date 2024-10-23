/* eslint-disable jsx-a11y/label-has-associated-control */

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { useGetBlogByIdQuery, useUpdateBlogMutation } from '@/redux/features/blogs/blogs.api';
import { toast } from '@/components/ui/use-toast';
import { useSession } from 'next-auth/react';
// Define the type for the session user
type SessionUser = {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    token?: any;
};
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

function EditBlog() {
    const router = useRouter();
    const { id } = router.query || {};
    const { data: session } = useSession();
    const [formData, setFormData] = useState({
        blog_title: '',
        blog_slug: '',
        thumbnail: '',
        description: '',
        category: '',
        read_count: 0,
        seo_tag: '',
    });

    const {
        data: blogData,
        error,
        isLoading,
    } = useGetBlogByIdQuery(id as string, { skip: !id });

    const [updateBlog] = useUpdateBlogMutation();

    useEffect(() => {
        if (blogData) {
            setFormData({
                blog_title: blogData.blog_title,
                blog_slug: blogData.blog_slug,
                thumbnail: blogData.thumbnail,
                description: blogData.description,
                category: blogData.category,
                read_count: blogData.read_count,
                seo_tag: blogData.seo_tag,
            });
        }
    }, [blogData]);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleDescriptionChange = (value: any) => {
        setFormData({
            ...formData,
            description: value,
        });
    };

    const handleSubmit = async (e: any) => {
        const token = (session?.user as SessionUser)?.token;
        e.preventDefault();
        try {
            await updateBlog({
                id: id as string,
                data: formData,
                token
            });
            toast({
                title: 'Blog has been updated.',
            });
            router.push('/all-blogs');
        } catch (err) {
            toast({
                title: 'Failed to update blog!',
            });
        }
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading blog data!</div>;

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Edit Blog</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-lg font-medium text-gray-700 mb-2">Title</label>
                    <input
                        type="text"
                        name="blog_title"
                        value={formData.blog_title}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                    />
                </div>
                <div>
                    <label className="block text-lg font-medium text-gray-700 mb-2">Slug</label>
                    <input
                        type="text"
                        name="blog_slug"
                        value={formData.blog_slug}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                    />
                </div>
                <div>
                    <label className="block text-lg font-medium text-gray-700 mb-2">Thumbnail URL</label>
                    <input
                        type="text"
                        name="thumbnail"
                        value={formData.thumbnail}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                    />
                </div>
                <div>
                    <label className="block text-lg font-medium text-gray-700 mb-2">SEO TAG</label>
                    <input
                        type="text"
                        name="seo_tag"
                        value={formData.seo_tag}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                    />
                </div>
                <div>
                    <label className="block text-lg font-medium text-gray-700 mb-2">Description</label>
                    <ReactQuill
                        value={formData.description}
                        onChange={handleDescriptionChange}
                        className="bg-white rounded-md shadow-sm"
                    />
                </div>
                <div>
                    <label className="block text-lg font-medium text-gray-700 mb-2">Category</label>
                    <input
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                    />
                </div>
                <div>
                    <label className="block text-lg font-medium text-gray-700 mb-2">Read Count</label>
                    <input
                        type="number"
                        name="read_count"
                        value={formData.read_count}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full px-4 py-2 text-lg font-medium text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-150 ease-in-out"
                >
                    Update Blog
                </button>
            </form>
        </div>
    );
}

EditBlog.layout = 'dashboard';
export default EditBlog;
