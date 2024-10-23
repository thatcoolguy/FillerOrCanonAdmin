/* eslint-disable jsx-a11y/label-has-associated-control */
import { toast } from '@/components/ui/use-toast';
import { useAddMetaDataMutation, useDeleteMetaDataMutation, useGetAllMetaDataQuery, useUpdateMetadataMutation } from '@/redux/features/metaData/metadata.api';
import { useSession } from 'next-auth/react';
import React, { useState, useEffect } from 'react';

type SessionUser = {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    token?: any;
};

type MetaData = {
    _id: string;
    pageName: string;
    metaDescription: string;
};

function AddMetaDataPage() {
    const initialFormState = {
        metaDescription: '',
        pageName: 'home'
    };
    const [form, setForm] = useState(initialFormState);
    const [editId, setEditId] = useState<string | null>(null);
    const { data: session } = useSession();
    const token = (session?.user as SessionUser)?.token;
    const [addMetaData] = useAddMetaDataMutation();
    const [updateMetadata] = useUpdateMetadataMutation();
    const [deleteMetaData] = useDeleteMetaDataMutation();
    const { data: metadataList, isLoading: getLoading } = useGetAllMetaDataQuery();

    useEffect(() => {
        if (editId && metadataList) {
            const metaDataToEdit = metadataList.find((meta: MetaData) => meta._id === editId);
            if (metaDataToEdit) {
                setForm({
                    metaDescription: metaDataToEdit.metaDescription,
                    pageName: metaDataToEdit.pageName
                });
            }
        } else {
            setForm(initialFormState);
        }
    }, []);

    const handleChange = (e: any) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (editId) {
            await updateMetadata({
                id: editId,
                data: form,
                token
            }).unwrap();
            toast({ title: 'Metadata updated successfully!' });
        } else {
            try {
                await addMetaData({
                    data: form,
                    token
                }).unwrap();
                toast({ title: 'Metadata added successfully!' });
            } catch (err) {
                toast({ title: "There was an error!" });
            }
        }
        setForm(initialFormState);
        setEditId(null);
    };

    const handleEdit = (meta: MetaData) => {
        setForm({
            metaDescription: meta.metaDescription,
            pageName: meta.pageName
        });
        setEditId(meta._id);
    };

    const handleDelete = async (id: string) => {
        await deleteMetaData({ id, token }).unwrap();
        toast({ title: 'Metadata deleted successfully!' });
    };

    return (
        <div className="max-w-2xl mx-auto p-8 shadow-md rounded-md">
            <h1 className="text-2xl font-bold text-center mb-6">{editId ? 'Edit Metadata' : 'Add New Metadata'}</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1">Select Page</label>
                    <select
                        className="border p-2 w-full"
                        name="pageName"
                        value={form.pageName}
                        onChange={handleChange}
                    >
                        <option value="home">Home</option>
                        <option value="heardle">Heardle</option>
                        <option value="decades">Decades</option>
                        <option value="genres">Genres</option>
                        <option value="performers">Performers</option>
                        <option value="search_result">Search Result</option>
                        <option value="about">About</option>
                        <option value="blog">Blog</option>
                        <option value="contact">Contact</option>
                    </select>
                </div>
                <div>
                    <label className="block mb-2 font-medium">Meta Description</label>
                    <textarea
                        name="metaDescription"
                        value={form.metaDescription}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <button type="submit" className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    {editId ? 'Update Metadata' : 'Add Metadata'}
                </button>
            </form>

            <div className="mt-8">
                <h2 className="text-xl font-bold mb-4">Existing Metadata</h2>
                {getLoading ? (
                    <p>Loading...</p>
                ) : (
                    <ul>
                        {metadataList?.map((meta: MetaData) => (
                            <li key={meta._id} className="flex justify-between items-center mb-4 p-4 border border-gray-200 rounded-md">
                                <div>
                                    <h3 className="font-semibold">{meta.pageName}</h3>
                                    <p>{meta.metaDescription}</p>
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => handleEdit(meta)}
                                        className="text-blue-600 hover:underline"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(meta._id)}
                                        className="text-red-600 hover:underline"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

AddMetaDataPage.layout = 'dashboard';

export default AddMetaDataPage;
