import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { FaCamera } from "react-icons/fa";
import fetcher from "../Utils/axios";
import toastr from 'toastr'

const CreateGroup = ({trigger, display }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [profile, setProfile] = useState(null);
  const [groupName, setGroupName] = useState("");
  const [groupType, setGroupType] = useState("Public");

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    console.log(file)
    if (file) {
      setProfile(file)
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  const handleCreate = ()=>{
    if(!groupName){
      return
    }
    const formData = new FormData()
    formData.append('Profile',profile)
    formData.append('Name',groupName)
    formData.append('GroupStatus',groupType)
    fetcher.post('group/create',formData ,{
      headers:{
        "Content-Type":"multipart/form-dat"
      }
    })
    .then(res=>{
      toastr.success("Created Group")
      trigger.setTrigger(!trigger.Trigger)
    }).catch(err=>{
      toastr.error(err.response.data.message||"Error In Creation")
    })
  }
  
  return (
    <div
      onClick={() => {
        display.setDisplay(false);
      }}
      className={`${
        display.Display ? "flex" : "hidden"
      } py-5 w-full fixed justify-center top-0 left-0 right-0 h-[100vh] bg-black z-40 bg-opacity-50`}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="p-5 bg-white rounded-md w-[100%] md:w-[47rem] overflow-auto noScrollBar"
      >
        <div className="flex justify-between items-center text-xl font-semibold text-gray-800 mb-4">
          <p>Enter Group Details</p>
          <button
            onClick={() => {
              display.setDisplay(false);
            }}
            className="text-lg hover:text-red-500"
          >
            <RxCross1 />
          </button>
        </div>

        <div className="flex flex-col items-center gap-4">
          {/* Profile Picture */}
          <div className="relative">
            <input
              type="file"
              id="profile-image"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <div className="w-24 h-24 rounded-full border border-gray-300 overflow-hidden flex items-center justify-center bg-gray-100">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Group Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <label
                  htmlFor="profile-image"
                  className="flex flex-col items-center justify-center text-gray-500 cursor-pointer"
                >
                  <FaCamera size={24} />
                  <span className="text-sm">Add Image</span>
                </label>
              )}
            </div>
            <div onClick={()=>{
                setProfileImage(null)
                document.getElementById('profile-image').value = null
            }} className={`w-full justify-center items-center pt-1 absolute -top-4 -right-10 ${profileImage?'flex':"hidden"}`}>
              <button title="Cancel" className= "font-semibold p-2 rounded-full"><RxCross1/></button>
            </div>
          </div>

          {/* Group Name */}
          <div className="w-full">
            <label
              htmlFor="group-name"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Group Name
            </label>
            <input
              type="text"
              id="group-name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="Enter group name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Group Type */}
          <div className="w-full">
            <p className="text-gray-700 text-sm font-medium mb-2">Group Type</p>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="group-type"
                  value="Private"
                  checked={groupType === "Private"}
                  onChange={(e) => setGroupType(e.target.value)}
                  className="form-radio text-blue-500"
                />
                <span>Private</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="group-type"
                  value="Public"
                  checked={groupType === "Public"}
                  onChange={(e) => setGroupType(e.target.value)}
                  className="form-radio text-blue-500"
                />
                <span>Public</span>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={() => {
              if(!groupName){
                return
              }
              handleCreate()
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Create Group
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateGroup;
