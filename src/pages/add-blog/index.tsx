/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { useAddBlogMutation } from '@/redux/features/blogs/blogs.api';
import { useSession } from 'next-auth/react';
import { toast } from '@/components/ui/use-toast';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

type SessionUser = {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    token?: any;
};

function AddBlog() {
    const [formState, setFormState] = useState({
        blog_title: '',
        blog_slug: '',
        thumbnail: '',
        description: '',
        category: '',
        read_count: 0,
        seo_tag: '',
    });
    const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
    const [addBlog] = useAddBlogMutation();
    const { data: session } = useSession();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setThumbnailFile(e.target.files[0]);
        }
    };

    const handleDescriptionChange = (value: string) => {
        setFormState({
            ...formState,
            description: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = (session?.user as SessionUser)?.token;

        const formData = new FormData();
        formData.append('blog_title', formState.blog_title);
        formData.append('blog_slug', formState.blog_slug);
        formData.append('seo_tag', formState.seo_tag);
        formData.append('description', formState.description);
        formData.append('category', formState.category);
        formData.append('read_count', formState.read_count.toString());
        if (thumbnailFile) formData.append('thumbnail', thumbnailFile); // Corrected field name

        try {
            const response = await addBlog({ data: formData, token });
            if (response.error) {
                toast({ title: 'Failed to add blog!' });
            } else {
                toast({ title: 'Blog has been added.' });
                // Reset form state after successful submission if needed
                setFormState({
                    blog_title: '',
                    blog_slug: '',
                    thumbnail: '',
                    description: '',
                    category: '',
                    read_count: 0,
                    seo_tag: '',
                });
                setThumbnailFile(null);
            }
        } catch (error) {
            toast({ title: 'Failed to add blog!' });
        }
    };


    const modules = {
        toolbar: {
            container: [
                [{ header: [1, 2, false] }],
                ['bold', 'italic', 'underline'],
                ['image', 'code-block'],
            ],
        },
    };

    return (
        <div className="max-w-4xl mx-auto p-6 shadow-md rounded-md">
            <h1 className="text-3xl font-bold mb-6 text-center">Add New Blog</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-lg font-medium mb-2">Title</label>
                    <input
                        type="text"
                        name="blog_title"
                        value={formState.blog_title}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                    />
                </div>
                <div>
                    <label className="block mb-1">Slug</label>
                    <input
                        type="text"
                        name="blog_slug"
                        value={formState.blog_slug}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                    />
                </div>
                <div>
                    <label className="block mb-2 font-medium">Featured Image</label>
                    <input
                        type="file"
                        name="featured_image"
                        onChange={handleFileChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div>
                    <label className="block text-lg font-medium mb-2">SEO TAG</label>
                    <input
                        type="text"
                        name="seo_tag"
                        value={formState.seo_tag}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                    />
                </div>
                <div>
                    <label className="block text-lg font-medium mb-2">Description</label>
                    <ReactQuill
                        value={formState.description}
                        onChange={handleDescriptionChange}
                        className="rounded-md shadow-sm"
                        modules={modules}
                        theme="snow"
                    />
                </div>
                <div>
                    <label className="block text-lg font-medium mb-2">Category</label>
                    <input
                        type="text"
                        name="category"
                        value={formState.category}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                    />
                </div>
                <div>
                    <label className="block text-lg font-medium mb-2">Read Count</label>
                    <input
                        type="number"
                        name="read_count"
                        value={formState.read_count}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-green-500 px-4 py-2 rounded w-full"
                >
                    Add Blog
                </button>
            </form>
        </div>
    );
}

AddBlog.layout = 'dashboard';
export default AddBlog;
