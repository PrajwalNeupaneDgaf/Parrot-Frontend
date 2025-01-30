import React, { useState } from 'react';
import { GiBirdMask } from "react-icons/gi";
import { UseCreatedContext } from '../Context/UserContext';
import toastr from 'toastr';
import fetcher from '../Utils/axios';
import { useNavigate } from 'react-router-dom';

const CreatePost = ({GroupId}) => {
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null); // State for image preview
    const [Text, setText] = useState('');
    const [Loading, setLoading] = useState(false);

    const { User } = UseCreatedContext();

    const navigate = useNavigate()

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file)); // Generate temporary URL
        }
    };

    const clearImage = () => {
        document.getElementById('image').value = null;
        setImage(null);
        setImagePreview(null); // Clear preview
    };

    const SharePost = () => {
        if (!image && !Text) {
            toastr.error("Both image and text can't be empty");
            return;
        }
        setLoading(true);
    
        // Create FormData to handle image and text
        const formData = new FormData();
        if (image) formData.append("image", image); // Add image
        if (Text) formData.append("Text", Text);   // Add text
        if(GroupId) formData.append("PostedAt", GroupId);
    
        fetcher.post('post/create', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then(() => {
            toastr.success("Posted");
            setImage(null); // Clear the image
            setImagePreview(null); // Clear the preview
            setText(""); // Clear the text
        })
        .catch((err) => {
            console.log(err);
            toastr.error(err.response?.data?.message || "Some error occurred");
        })
        .finally(() => {
            setLoading(false);
        });
    };

    return (
        <div className='px-3 flex flex-row gap-3 items-start'>
            <img onClick={()=>{
                navigate(`/profile/${User._id}`)
            }} src={User.profile} alt="Profile" className='md:h-16 h-12 w-12 md:w-16 cursor-pointer rounded-full object-cover' />
            <div className='flex-grow bg-gray-100 rounded-lg border shadow-sm p-4'>
                <div className='flex flex-col gap-3'>
                    <textarea
                        value={Text}
                        onChange={(e) => setText(e.target.value)}
                        className='h-24 w-full p-2 text-sm md:text-lg bg-white border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-300'
                        placeholder='Create a Post...'
                    ></textarea>
                    {imagePreview && (
                        <div className='relative w-full flex justify-center'>
                            <img
                                src={imagePreview}
                                alt="Preview"
                                className='max-h-40 rounded-lg border object-contain'
                            />
                            <button
                                onClick={clearImage}
                                className='absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full'
                            >
                                ✕
                            </button>
                        </div>
                    )}
                </div>

                <div className='flex items-center md:justify-end md:gap-3 justify-between mt-4'>
                    <label
                        htmlFor="image"
                        className={`cursor-pointer text-xs md:text-lg bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 transition ${image ? 'hidden' : ''}`}
                    >
                        Add Image
                    </label>
                    <input
                        onChange={handleImageChange}
                        type="file"
                        accept="image/jpeg, image/png, image/jpg"
                        className="hidden"
                        id="image"
                    />
                    <button
                        onClick={SharePost}
                        className={`flex text-xs md:text-lg items-center gap-2 px-3 md:px-6 py-2 rounded-md shadow ${Loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600'} text-white transition`}
                        disabled={Loading}
                    >
                        {Loading ? 'Posting...' : 'Share Post'} <GiBirdMask />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreatePost;
