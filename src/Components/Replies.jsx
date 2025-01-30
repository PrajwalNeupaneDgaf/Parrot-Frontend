import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UseCreatedContext } from "../Context/UserContext";
import { CiMenuKebab } from "react-icons/ci";
import Notify from "./Notify";
import { RxCross1 } from "react-icons/rx";
import fetcher from "../Utils/axios";
import toastr from "toastr";
import { RiTwitchLine } from "react-icons/ri";

const Replies = ({ data, postId, commentId }) => {
  let navigate = useNavigate();
  const [isMineReply, setisMineReply] = useState(false);
  const [showOptions, setshowOptions] = useState(false);
  const [alertDelete, setAlertDelete] = useState(false);
  const [isEditing, setisEditing] = useState(false);
  const [editReply, seteditReply] = useState("");

  const { User } = UseCreatedContext();

  useEffect(() => {
    if (data.By._id == User._id) {
      setisMineReply(true);
    }
  }, []);

  const handleDelete = () => {
    fetcher
      .delete(`/post/deletereply/${postId + "/" + commentId + "/" + data?._id}`)
      .then(() => {
        toastr.info("Succesfull");
        setTrigger(p=>!p)
      })
      .catch(() => {
        toastr.error("Failed");
      });
  };
  const handleEdit = () => {
    fetcher
      .put(`/post/editreply/${postId + "/" + commentId + "/" + data?._id}`,{
        newText:editReply
      })
      .then(() => {
        toastr.info("Succesfull");
        setTrigger(p=>!p)
      })
      .catch(() => {
        toastr.error("Failed");
      });
      setisEditing(false)
      seteditReply('')
      setshowOptions(false)
  };
  return (
    <div>
      <div className="flex flex-row gap-2 pl-5 ">
        <img
          onClick={() => {
            navigate(`/profile/${data?.By?._id}`);
          }}
          src={data?.By?.profile}
          alt="Error"
          className="h-6 w-6 md:h-12 md:w-12 object-cover rounded-full bg-black  transition-all duration-200 cursor-pointer hover:scale-110"
        />
        <div className="flex flex-col w-full">
          <div className="flex justify-between items-center py-1 pr-4 w-full relative">
            <b className="text-sm md:text-lg">{data?.By?.name}</b>
            <button
              onClick={() => {
                if (showOptions) {
                  setisEditing(false);
                }
                setshowOptions(!showOptions);
              }}
              className={`${isMineReply ? "" : "hidden"} `}
            >
              {showOptions ? <RxCross1 /> : <CiMenuKebab />}
            </button>
            <div
              className={` rounded w-32 items-center z-20  flex-col gap-1 text-sm absolute top-0 right-8 ${
                isMineReply && showOptions ? "flex" : "hidden"
              }`}
            >
              <button
                onClick={() => {
                  if (isEditing) {
                    setisEditing(false);
                    seteditReply("");
                  } else {
                    setisEditing(true);
                    seteditReply(data?.Text);
                  }
                  setshowOptions(false);
                }}
                className="bg-gray-300 w-24 rounded-md hover:bg-green-500 py-1"
              >
                {isEditing ? "Cancel" : "Edit"}
              </button>
              <button
                onClick={() => {
                  setAlertDelete(true);
                  setshowOptions(false);
                }}
                className="bg-gray-300 w-24 rounded-md hover:bg-red-500 py-1"
              >
                Delete
              </button>
            </div>
          </div>
          <b className=" md:text-sm text-xs text-gray-800">{data?.Text}</b>
        </div>

        {/* Edit The Reply  */}
        
      </div>
      <div className={`mt-2 w-full ${isEditing ? "" : "hidden"}`}>
          <div className="md:h-16 h-12 w-full bg-gray-200 mt-1 rounded-md p-[1.9px] flex flex-row px-2 items-center  gap-2">
            <img
              onClick={() => {
                navigate(`/profile/${data.By._id}`);
              }}
              src={User.profile}
              alt="Profile"
              className=" object-cover h-7 w-7 md:h-10 md:w-10 bg-black rounded-full hover:scale-110 transition-all duration-200 cursor-pointer"
            />
            <input
              type="text"
              value={editReply}
              onChange={(e) => {
                seteditReply(e.target.value);
              }}
              placeholder="Edit Comment"
              className="h-full w-full border-none outline-none md:text-lg text-xs px-2  bg-transparent"
            />
            <div className="flex flex-row gap-1">
              <button
                onClick={() => {
                  setisEditing(false);
                  seteditReply("");
                }}
                className="md:text-xl"
              >
                <RxCross1 title=" Cancel Edit" />
              </button>
              <button onClick={handleEdit} className="md:text-xl">
                <RiTwitchLine title=" Update Reply" />
              </button>
            </div>
          </div>
        </div>
        <Notify
          Title={"Delete This Comment"}
          data={"Are You Sure You want to delete this Comment"}
          setDisplay={setAlertDelete}
          display={alertDelete}
          acceptFun={handleDelete}
        />
    </div>
  );
};

export default Replies;
