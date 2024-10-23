/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useDeleteHeardleMutation, useGetAllHeardlesQuery, useUpdateHeardleMutation } from '@/redux/features/heardles/heardles.api';
import { useSession } from 'next-auth/react';
import { toast } from '@/components/ui/use-toast';
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';
// Dynamically import ReactQuill with no SSR
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
type SessionUser = {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    token?: any;
};

interface Heardle {
    _id?: any;
    deezer_playlist_id?: number;
    heardle_name?: string;
    heardle_slug?: string;
    category?: string;
    thumbnail?: string;
    featured_image?: string;
    description?: string;
    seo_text?: string;
    rating_count?: string;
    rating_value?: string;
    plays?: string;
    heardleType?: string;
}
type HeardleEvent = React.ChangeEvent<HTMLTextAreaElement | HTMLSelectElement | HTMLInputElement>;
export default function Heardles() {
    const [editHeardle, setEditHeardle] = useState<Heardle>({});
    const { data: session } = useSession();
    const { data: allHeardle, isLoading } = useGetAllHeardlesQuery();
    const [updateHeardle, { isLoading: updateHeardleLoading }] = useUpdateHeardleMutation();
    const [deleteHeardle, { isLoading: deleteHeardleLoading }] = useDeleteHeardleMutation();

    const handleEditChange = (e: HeardleEvent) => {
        const { name, value } = e.target;
        setEditHeardle((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleDescriptionChange = (value: string) => {
        setEditHeardle((prevForm) => ({
            ...prevForm,
            description: value,
        }));
    };


    const token = (session?.user as SessionUser)?.token;
    const saveHeardle = async () => {
        try {
            if (editHeardle) {
                await updateHeardle({ data: editHeardle, id: editHeardle._id, token });
                setEditHeardle({});
                toast({
                    title: 'Heardle has been updated.',
                });
            } else {
                toast({
                    title: 'EditHeardle is null or undefined',
                });
            }
        } catch (error) {
            toast({
                title: 'Failed to update heardle.',
            });
        }
    };

    const handleDeleteHeardle = async (id: any) => {
        try {
            await deleteHeardle({ id, token });
            toast({
                title: 'Heardle has been deleted.',
            });
        } catch (error) {
            toast({
                title: 'Failed to delete heardle.',
            });
        }
    };

    if (isLoading || updateHeardleLoading || deleteHeardleLoading) {
        return <p>Loading....</p>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Heardles</h1>
            <table className="min-w-full">
                <thead>
                    <tr>
                        <th className="py-2">Name</th>
                        <th className="py-2">Slug</th>
                        <th className="py-2">Category</th>
                        <th className="py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {allHeardle?.data.map((heardle: any) => (
                        <tr key={heardle._id} className="text-center">
                            <td className="py-2">{heardle.heardle_name}</td>
                            <td className="py-2">{heardle.heardle_slug}</td>
                            <td className="py-2">{heardle.category}</td>
                            <td className="py-2">
                                <button
                                    className="bg-blue-500 px-4 py-2 rounded mr-2"
                                    onClick={() => setEditHeardle(heardle)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="bg-red-500 px-4 py-2 rounded"
                                    onClick={() => handleDeleteHeardle(heardle._id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {editHeardle && (
                <div className="mt-4">
                    <h2 className="text-xl font-bold mb-4">Edit Heardle</h2>
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <label className="block mb-1">Deezer Playlist Id</label>
                            <input
                                className="border p-2 w-full"
                                type="number"
                                name="deezer_playlist_id"
                                value={editHeardle.deezer_playlist_id}
                                onChange={handleEditChange}
                                placeholder="Deezer Playlist Id"
                            />
                        </div>
                        <div>
                            <label className="block mb-1">Heardle Name</label>
                            <input
                                className="border p-2 w-full"
                                type="text"
                                name="heardle_name"
                                value={editHeardle.heardle_name}
                                onChange={handleEditChange}
                                placeholder="Heardle Name"
                            />
                        </div>
                        <div>
                            <label className="block mb-1">Heardle Slug</label>
                            <input
                                className="border p-2 w-full"
                                type="text"
                                name="heardle_slug"
                                value={editHeardle.heardle_slug}
                                onChange={handleEditChange}
                                placeholder="Heardle Slug"
                            />
                        </div>
                        <div>
                            <label className="block mb-1">Category</label>
                            <input
                                className="border p-2 w-full"
                                type="text"
                                name="category"
                                value={editHeardle.category}
                                onChange={handleEditChange}
                                placeholder="Category"
                            />
                        </div>
                        <div>
                            <label className="block mb-1">Thumbnail</label>
                            <input
                                className="border p-2 w-full"
                                type="text"
                                name="thumbnail"
                                value={editHeardle.thumbnail}
                                onChange={handleEditChange}
                                placeholder="Thumbnail"
                            />
                        </div>
                        <div>
                            <label className="block mb-1">Featured Image</label>
                            <input
                                className="border p-2 w-full"
                                type="text"
                                name="featured_image"
                                value={editHeardle.featured_image}
                                onChange={handleEditChange}
                                placeholder="Featured Image"
                            />
                        </div>
                        <div>
                            <label className="block mb-1">Description</label>
                            {/* <textarea
                                className="border p-2 w-full"
                                name="description"
                                value={editHeardle.description}
                                onChange={handleEditChange}
                                placeholder="Description"
                                rows={8}
                            /> */}
                            <ReactQuill
                                className="border p-2 w-full"
                                value={editHeardle.description}
                                onChange={handleDescriptionChange}
                                placeholder="Description"
                                theme="snow"
                            />
                        </div>
                        <div>
                            <label className="block mb-1">SEO Text</label>
                            <input
                                className="border p-2 w-full"
                                type="text"
                                name="seo_text"
                                value={editHeardle.seo_text}
                                onChange={handleEditChange}
                                placeholder="SEO Text"
                            />
                        </div>
                        <div>
                            <label className="block mb-1">Rating Count</label>
                            <input
                                className="border p-2 w-full"
                                type="text"
                                name="rating_count"
                                value={editHeardle.rating_count}
                                onChange={handleEditChange}
                                placeholder="Rating Count"
                            />
                        </div>
                        <div>
                            <label className="block mb-1">Rating Value</label>
                            <input
                                className="border p-2 w-full"
                                type="text"
                                name="rating_value"
                                value={editHeardle.rating_value}
                                onChange={handleEditChange}
                                placeholder="Rating Value"
                            />
                        </div>
                        <div>
                            <label className="block mb-1">Plays</label>
                            <input
                                className="border p-2 w-full"
                                type="text"
                                name="plays"
                                value={editHeardle.plays}
                                onChange={handleEditChange}
                                placeholder="Plays"
                            />
                        </div>
                        <div>
                            <label className="block mb-1">Heardle Type</label>
                            <select
                                className="border p-2 w-full"
                                name="heardleType"
                                value={editHeardle.heardleType}
                                onChange={handleEditChange}
                            >
                                <option value="Genre">Genre</option>
                                <option value="Performer">Performer</option>
                            </select>
                        </div>
                        <button
                            className="bg-green-500 px-4 py-2 rounded"
                            onClick={saveHeardle}
                        >
                            Save
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

Heardles.layout = 'dashboard';
