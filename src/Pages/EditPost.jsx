import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../Layout/Layout";
import { UseCreatedContext } from "../Context/UserContext";
import { GiBirdMask } from "react-icons/gi";
import { FaTrash } from "react-icons/fa"; // Import Trash icon
import fetcher from "../Utils/axios";
import toastr from "toastr";
import Notify from "../Components/Notify"; // Assuming Notify is a custom component

const EditPost = () => {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // State for image preview
  const [Text, setText] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [Loading, setLoading] = useState(false);
  const [showNotify, setShowNotify] = useState(false); // State to show/hide Notify dialog

  const { User } = UseCreatedContext();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetcher
      .get(`post/get/${id}`)
      .then((res) => {
        const data = res.data;
        setText(data?.Text);
        setImagePreview(data?.Image);
        if (data?.Image) {
          setImageLink(data.Image);
        }
      })
      .catch((err) => {
        toastr.error(err.response.data?.message || "Some Error Occurred");
        navigate(-1);
      });
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      if (imageLink) {
        setImageLink("");
      }
      setImagePreview(URL.createObjectURL(file)); // Generate temporary URL
    }
  };

  const clearImage = () => {
    document.getElementById("image").value = null;
    setImage(null);
    setImagePreview(null);
    if (imageLink) {
      setImageLink("");
    }
  };

  const SharePost = () => {
    if (!image && !Text && !imageLink) {
      toastr.error("Both image and text can't be empty");
      return;
    }
    setLoading(true);

    // Create FormData to handle image and text
    const formData = new FormData();
    if (image) formData.append("image", image);
    if (Text) formData.append("Text", Text);
    if (imageLink) formData.append("imageLink", imageLink);

    fetcher
      .put(`post/update/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        toastr.success("Post Updated");
        setImage(null); // Clear the image
        setImagePreview(null); // Clear the preview
        setText("");
        navigate(-1);
      })
      .catch((err) => {
        console.log(err);
        toastr.error(err.response?.data?.message || "Some error occurred");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleDeletePost = () => {
    setLoading(true)
    fetcher
      .delete(`post/delete/${id}`)
      .then(() => {
        toastr.success("Post Deleted");
        navigate(-1);
      })
      .catch((err) => {
        console.log(err);
        toastr.error(err.response?.data?.message || "Failed to delete post");
      }).finally(()=>{
        setLoading(false)
      });
  };

  return (
    <Layout>
      <div className="relative px-3 flex flex-row gap-3 pt-3 items-start">
        {/* Delete Icon */}

        <img
          onClick={() => {
            navigate(`/profile/${User._id}`);
          }}
          src={User.profile}
          alt="Profile"
          className="md:h-16 h-9 w-9 md:w-16 cursor-pointer rounded-full object-cover"
        />

        <div className="flex-grow bg-gray-100 rounded-lg border shadow-sm p-4 relative">
          <div className="flex flex-col gap-3 ">
            
            <textarea
              value={Text}
              onChange={(e) => setText(e.target.value)}
              className="h-24 w-full p-2 text-sm md:text-lg bg-white border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Create a Post..."
            ></textarea>
            {imagePreview && (
              <div className="relative w-full flex justify-center">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="max-h-40 rounded-lg border object-contain"
                />
                <button
                  onClick={clearImage}
                  className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full"
                >
                  ✕
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center md:justify-end md:gap-3 justify-between mt-4">
            <label
              htmlFor="image"
              className={`cursor-pointer text-xs md:text-lg bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 transition ${
                image ? "hidden" : ""
              }`}
            >
              Image
            </label>
            <input
              onChange={handleImageChange}
              type="file"
              accept="image/jpeg, image/png, image/jpg"
              className="hidden"
              id="image"
            />
            <button
              onClick={()=>{
                setShowNotify(true)
              }}
              className={`flex text-xs md:text-lg items-center gap-2 px-3 md:px-6 py-2 rounded-md shadow ${
                Loading
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-red-500 hover:bg-red-600"
              } text-white transition`}
              disabled={Loading}
            >
              {Loading ? "....." : "Delete"} <FaTrash />
            </button>
            <button
              onClick={SharePost}
              className={`flex text-xs md:text-lg items-center gap-2 px-3 md:px-6 py-2 rounded-md shadow ${
                Loading
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-orange-500 hover:bg-orange-600"
              } text-white transition`}
              disabled={Loading}
            >
              {Loading ? "......" : "Update"} <GiBirdMask />
            </button>
          </div>
        </div>
      </div>

      {/* Notify Component */}
      {showNotify && (
        <Notify
         display={showNotify}
         setDisplay={setShowNotify}
         Title={"Want To Delete"}
         data={"If you accept the process Post will be deleted"}
         acceptFun={handleDeletePost}
        />
      )}
    </Layout>
  );
};

export default EditPost;
