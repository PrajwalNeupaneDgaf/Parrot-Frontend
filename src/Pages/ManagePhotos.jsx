import React, { useEffect, useState } from 'react';
import Layout from '../Layout/Layout';
import { FaEllipsisV } from 'react-icons/fa';
import { MdDelete, MdPerson } from 'react-icons/md';
import toastr from 'toastr';
import Notify from '../Components/Notify'; // Adjust path as per your project structure
import { UseCreatedContext } from '../Context/UserContext';
import fetcher from '../Utils/axios';

const ManagePhotos = () => {
    const [photos, setPhotos] = useState([]); // Dummy image URLs
    const [activePhoto, setActivePhoto] = useState(null); // State for managing overlay visibility
    const [displayNotify, setDisplayNotify] = useState(false); // For showing confirmation dialog
    const [notifyAction, setNotifyAction] = useState(null); // Action to perform on accept
    const [newProfileImage, setNewProfileImage] = useState(null); // State for new profile image
    const [imagePreview, setImagePreview] = useState(null); // State for previewing the new profile image

    const {User} = UseCreatedContext()
    useEffect(()=>{
        if(User){
            setPhotos(User?.profilePictures)
        }
    },[User])

    const handleDelete = (photo) => {
        fetcher.post('/user/deleteimage',{
            imageUrl:photo
        }).then((res)=>{
            toastr.success("You Have Successfully Deleted Profile")
        }).catch((err)=>{
            toastr.error(err?.response?.data?.message||"Something Went Wrong")
        })
        setActivePhoto(null);
    };

    const handleSetAsProfile = (photo) => {
        fetcher.put('/user/setasprofile',{
            url:photo
        }).then((res)=>{
            toastr.success("You Have Successfully Changed Profile")
        }).catch((err)=>{
            toastr.error(err?.response?.data?.message||"Something Went Wrong")
        })
        setActivePhoto(null);
    };

    const confirmAction = (action, photo) => {
        setNotifyAction(() => () => action(photo));
        setDisplayNotify(true);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewProfileImage(file);
            setImagePreview(URL.createObjectURL(file)); // Generate preview URL
        }
    };

    const handleSaveProfileImage = () => {
        if (!newProfileImage) {
            toastr.error('Select atleast one Photo')
            return;
        }
        const formdData = new FormData()
        formdData.append("profile",newProfileImage)
        fetcher.post('/user/uploadphoto',formdData ,{
            headers:{
                'Content-Type': 'multipart/form-data'
            }
        })
        .then((res)=>{
            toastr.success("You Have Successfully Changed Profile")
        }).catch((err)=>{
            toastr.error(err?.response?.data?.message||"Something Went Wrong")
        })
        setNewProfileImage(null); // Clear after saving
        setImagePreview(null); // Clear preview
        document.getElementById('profile-image-input').value = null
    };

    const handleCancelProfileImage =()=>{
        setNewProfileImage(null); // Clear after saving
        setImagePreview(null);
        document.getElementById('profile-image-input').value = null
    }

    return (
        <Layout>
            <div className="p-4 flex justify-between  pb-2">
                <h1 className="text-xl font-bold">Manage Photos</h1>
                
                {/* Add Profile Image Button */}
                <div>
                    <label
                        htmlFor="profile-image-input"
                        className="px-4 py-2 bg-blue-600 text-white rounded-md cursor-pointer"
                    >
                        Add Profile
                    </label>
                    <input
                        id="profile-image-input"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                    />
                </div>
                </div>

                  {/* Profile Image Preview and Save Button */}
                  {imagePreview && (
                    <div className="mt-4 text-center">
                        <h2 className="text-lg font-bold mb-4">Profile Image Preview</h2>
                        <img
                            src={imagePreview}
                            alt="Profile Preview"
                            className="w-40 h-44 object-cover rounded-lg shadow-md mx-auto"
                        />
                        <button
                            onClick={handleSaveProfileImage}
                            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md"
                        >
                            Save
                        </button>
                        <button
                            onClick={handleCancelProfileImage}
                            className="mt-4 px-4 py-2 ml-2 bg-black text-white rounded-md"
                        >
                            Cancel
                        </button>
                    </div>
                )}
                      

                <div className="flex justify-center md:justify-start flex-wrap gap-4 mt-16">
                    {photos?.map((photo, index) => (
                        <div key={index} className="relative group w-60 h-80">
                            <img
                                src={photo}
                                alt={`Photo ${index}`}
                                className="w-full h-full object-cover rounded-lg shadow-md"
                            />
                            <button
                                onClick={() => setActivePhoto(activePhoto === photo ? null : photo)}
                                className="absolute top-2 right-2 p-1 bg-black bg-opacity-60 text-white rounded-full shadow-lg group-hover:opacity-100 transition opacity-0"
                            >
                                <FaEllipsisV size={16} />
                            </button>
                            {activePhoto === photo && (
                                <div className="absolute top-10 right-0 bg-white rounded-lg shadow-lg p-2 z-10">
                                    <button
                                        onClick={() => confirmAction(handleDelete, photo)}
                                        className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 w-full text-left rounded-md"
                                    >
                                        <MdDelete size={16} />
                                        Delete
                                    </button>
                                    <button
                                        onClick={() => confirmAction(handleSetAsProfile, photo)}
                                        className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 w-full text-left rounded-md"
                                    >
                                        <MdPerson size={16} />
                                        Set as Profile
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

              
     

            {/* Notify Component */}
            <Notify
                Title="Are you sure?"
                data="Do you really want to proceed with this action?"
                acceptFun={() => notifyAction && notifyAction()}
                display={displayNotify}
                setDisplay={setDisplayNotify}
            />
        </Layout>
    );
};

export default ManagePhotos;
