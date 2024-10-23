/* eslint-disable jsx-a11y/label-has-associated-control */
import { toast } from '@/components/ui/use-toast';
import { useAddHeardleMutation } from '@/redux/features/heardles/heardles.api';
import { useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import 'react-quill/dist/quill.snow.css';

// Dynamically import ReactQuill with no SSR
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

type SessionUser = {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    token?: any;
};

function AddHeardlePage() {
    const initialFormState = {
        deezer_playlist_id: '',
        heardle_name: '',
        heardle_slug: '',
        description: '',
        category: '',
        seo_text: '',
        rating_count: '',
        rating_value: '',
        plays: '',
        heardleType: 'Genre'
    };
    const [form, setForm] = useState(initialFormState);
    const [thumbnail, setThumbnail] = useState<File | null>(null);
    const [featuredImage, setFeaturedImage] = useState<File | null>(null);
    const { data: session } = useSession();
    const [addHeardle, { isLoading }] = useAddHeardleMutation();
    const token = (session?.user as SessionUser)?.token;

    const handleChange = (e: any) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleDescriptionChange = (value: string) => {
        setForm((prevForm) => ({
            ...prevForm,
            description: value,
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;
        if (files && files.length > 0) {
            const file = files[0];
            if (name === 'thumbnail') {
                setThumbnail(file);
            } else if (name === 'featured_image') {
                setFeaturedImage(file);
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('deezer_playlist_id', form.deezer_playlist_id);
        formData.append('heardle_name', form.heardle_name);
        formData.append('heardle_slug', form.heardle_slug);
        formData.append('description', form.description);
        formData.append('category', form.category);
        formData.append('seo_text', form.seo_text);
        formData.append('rating_count', form.rating_count);
        formData.append('rating_value', form.rating_value);
        formData.append('plays', form.plays);
        formData.append('heardleType', form.heardleType);

        if (thumbnail) {
            formData.append('thumbnail', thumbnail);
        }

        if (featuredImage) {
            formData.append('featured_image', featuredImage);
        }

        try {
            await addHeardle({ data: formData, token });
            toast({
                title: 'Heardle has been added.',
            });
            setForm(initialFormState);
            setThumbnail(null);
            setFeaturedImage(null);
        } catch (err) {
            toast({
                title: 'There was an error!',
            });
        }
    };
    if (isLoading) {
        return <p>Loading...</p>
    }
    return (
        <div className="max-w-2xl mx-auto p-8 shadow-md rounded-md">
            <h1 className="text-2xl font-bold text-center mb-6">Add New Heardle</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-2 font-medium">Deezer Playlist ID</label>
                    <input
                        type="number"
                        name="deezer_playlist_id"
                        value={form.deezer_playlist_id}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>

                <div>
                    <label className="block mb-2 font-medium">Heardle Name</label>
                    <input
                        type="text"
                        name="heardle_name"
                        value={form.heardle_name}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>

                <div>
                    <label className="block mb-2 font-medium">Heardle Slug</label>
                    <input
                        type="text"
                        name="heardle_slug"
                        value={form.heardle_slug}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>

                <div>
                    <label className="block mb-2 font-medium">Thumbnail</label>
                    <input
                        type="file"
                        name="thumbnail"
                        onChange={handleFileChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md"
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
                    <label className="block mb-2 font-medium">Description</label>
                    <ReactQuill
                        className="border p-2 w-full"
                        value={form.description}
                        onChange={handleDescriptionChange}
                        placeholder="Description"
                        theme="snow"
                    />
                </div>


                <div>
                    <label className="block mb-2 font-medium">Category</label>
                    <input
                        type="text"
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>

                <div>
                    <label className="block mb-2 font-medium">SEO Text</label>
                    <textarea
                        name="seo_text"
                        value={form.seo_text}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>

                <div>
                    <label className="block mb-2 font-medium">Rating Count</label>
                    <input
                        type="number"
                        name="rating_count"
                        value={form.rating_count}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>

                <div>
                    <label className="block mb-2 font-medium">Rating Value</label>
                    <input
                        type="number"
                        name="rating_value"
                        value={form.rating_value}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>

                <div>
                    <label className="block mb-2 font-medium">Plays</label>
                    <input
                        type="number"
                        name="plays"
                        value={form.plays}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>

                <div>
                    <label className="block mb-1">Heardle Type</label>
                    <select
                        className="border p-2 w-full"
                        name="heardleType"
                        value={form.heardleType}
                        onChange={handleChange}
                    >
                        <option value="Genre">Genre</option>
                        <option value="Performer">Performer</option>
                        <option value="Decades">Decades</option>
                        <option value="Others">Others</option>
                    </select>
                </div>

                <button type="submit" className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    Add Heardle
                </button>
            </form>
        </div>
    );
}

AddHeardlePage.layout = 'dashboard';

export default AddHeardlePage;

