import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import fetcher from "../Utils/axios";
import toastr from "toastr";
import { RxCross1 } from "react-icons/rx";
import { FaCamera } from "react-icons/fa";

const UpdateGroup = ({ setisEditMode }) => {
  const { id } = useParams();

  // States
  const [data, setData] = useState({});
  const [profileImage, setProfileImage] = useState(null);
  const [profile, setProfile] = useState(null);
  const [groupName, setGroupName] = useState("");
  const [groupType, setGroupType] = useState("Public");
  const [loading, setLoading] = useState(true);
  const [isProcessLoading, setisProcessLoading] = useState(false);


  // Fetch group data for updating
  useEffect(() => {
    setLoading(true);
    fetcher
      .get(`group/data/update/${id}`)
      .then((res) => {
        const fetchedData = res.data.data;
        setData(fetchedData);
        setProfileImage(fetchedData?.Profile || null);
        setGroupName(fetchedData?.Name || "");
        setGroupType(fetchedData?.GroupStatus || "Public");
      })
      .catch((err) => {
        setisEditMode(false);
      })
      .finally(() => setLoading(false));
  }, [id, setisEditMode]);

  if (loading)
    return <b className="w-full text-center">WAITING FOR RESPONSE ..</b>;

  // Handle image selection
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfile(file);
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  // Placeholder for update functionality
  const handleUpdate = () => {
    if (!groupName) {
      toastr.warning("Group name cannot be empty!");
      return;
    }
    setisProcessLoading(true)

    const formData = new FormData();
    formData.append("Name", groupName);
    formData.append("GroupStatus", groupType);
    if (profile) formData.append("Profile", profile);

    fetcher
      .put(`group/update/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        toastr.success("Group updated successfully!");
        setisEditMode(false); // Exit edit mode
      })
      .catch((err) => {
        console.log(err)
        toastr.error("Failed to update group.");
      }).finally(setisProcessLoading(false))
  };

  return (
    <div className="px-2 md:px-5 flex flex-col gap-2">
      <div className="flex gap-2 flex-col justify-center items-center py-5">
        {profileImage && (
          <img
            src={profileImage}
            alt="Error"
            className="h-32 w-32 object-cover rounded-full border-2 border-solid border-green-500"
          />
        )}
        <div>
          {profile ? (
            <button
              className="bg-orange-500 py-1 px-7 rounded"
              onClick={() => {
                setProfile(null);
                setProfileImage(data.Profile);
                document.getElementById("imageInput").value = null; // Clear file input
              }}
            >
              Remove
            </button>
          ) : (
            <label
              className="bg-orange-500 cursor-pointer py-1 px-7 rounded"
              htmlFor="imageInput"
            >
              Change
            </label>
          )}
          <input
            onChange={handleImageChange}
            type="file"
            accept=".jpg, .jpeg, .png"
            className="hidden" // Keep this input hidden
            id="imageInput"
          />
        </div>
      </div>
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
      {/* Group Type  */}

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
        {/* Submit Button  */}
        <div className="px-2 flex justify-center items-center">
          <button
            onClick={() => {
              if (!groupName || isProcessLoading) {
                return;
              }
              handleUpdate();
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
           {
             isProcessLoading?".....":' Update Group'
           }
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateGroup;
