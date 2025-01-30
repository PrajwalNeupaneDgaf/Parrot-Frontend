import React, { useEffect, useState } from "react";
import { CiHeart, CiMenuKebab } from "react-icons/ci";
import Replies from "./Replies";
import { UseCreatedContext } from "../Context/UserContext";
import { RiTwitchLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import fetcher from "../Utils/axios";
import toastr from "toastr";
import LoadingScreen from "./LoadingScreen";
import { FaHeart } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import Notify from "./Notify";

const Comment = ({ data, postId , setTrigger }) => {
  const [ShowReplies, setShowReplies] = useState(false);

  const navigate = useNavigate();
  const [Comment, setComment] = useState();
  const [isLiked, setisLiked] = useState(false);
  const [isOwnComment, setisOwnComment] = useState();
  const [Loading, setLoading] = useState(true);
  const [Likes, setLikes] = useState(data?.LikedBy.length || 0);

  const [showOptions, setshowOptions] = useState(false);

  const [alertDelete, setAlertDelete] = useState(false);
  const [editComment, setEditComment] = useState("");
  const [isEditing, setisEditing] = useState(false);

  const { User } = UseCreatedContext();

  useEffect(() => {
    const likedBy = data?.LikedBy || [];
    if (likedBy.includes(User._id)) {
      setisLiked(true);
    }
    if (data?.By?._id == User?._id) {
      setisOwnComment(true);
    }
    setLoading(false);
  }, []);

  const manageLike = () => {
    fetcher
      .get(`/post/likecomment/${postId}/${data?._id}`)
      .then(() => {
        if (isLiked) {
          setLikes(Likes - 1);
        } else {
          setLikes(Likes + 1);
        }
        setisLiked(!isLiked);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const ToggleShowReplies = () => {
    setShowReplies(!ShowReplies);
  };

  const PostComment = () => {
    if (!Comment) {
      return;
    }
    fetcher
      .post(`/post/addreply/${postId}/${data._id}`, {
        Text: Comment,
      })
      .then(() => {
        toastr.info("Replied");
        setComment("");
        setTrigger(prev=>!prev)
      })
      .catch((err) => {
        console.log(err);
        toastr.error("Try again");
      });
  };

  const handleDelete = () => {
    fetcher
      .delete(`/post/deletecomment/${postId}/${data._id}`)
      .then(() => {
        toastr.info("Deleted");
        setTrigger(p=>!p)
      })
      .catch((err) => {
        toastr.error("Try again");
      });
  };
  const handleEdit = () => {
    if (!editComment) {
      return;
    }
    fetcher
      .put(`/post/editcomment/${postId}/${data?._id}`, {
        newText: editComment,
      })
      .then(() => {
        toastr.success("Edited");
        setisEditing(false);
        setTrigger(p=>!p)
        setEditComment("");
      })
      .catch(() => {
        toastr.error("Not Edited");
      });
  };

  if (Loading) {
    return <LoadingScreen />;
  }
  return (
    <div className="flex flex-row gap-1">
      <img
        onClick={() => {
          navigate(`/profile/${data.By._id}`);
        }}
        src={data.By.profile}
        alt="Error"
        className="h-9 w-9 md:h-16 md:w-16 object-cover rounded-full bg-black transition-all duration-200 cursor-pointer hover:scale-110"
      />
      <div className="flex items-center justify-between w-full pr-3">
        <div className="flex justify-start flex-col gap-1 w-full">
          <b className="text-lg">{data?.By?.name}</b>
          <b className=" md:text-sm text-xs text-gray-800">{data.Text}</b>

          {/* Edit the Comment  */}

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
                value={editComment}
                onChange={(e) => {
                  setEditComment(e.target.value);
                }}
                placeholder="Edit Comment"
                className="h-full w-full border-none outline-none md:text-lg text-xs px-2  bg-transparent"
              />
              <div className="flex flex-row gap-1">
                <button
                  onClick={() => {
                    setisEditing(false);
                    setEditComment("");
                  }}
                  className="md:text-xl"
                >
                  <RxCross1 title=" Cancel Edit" />
                </button>
                <button onClick={handleEdit} className="md:text-xl">
                  <RiTwitchLine title=" Update Comment" />
                </button>
              </div>
            </div>

            {/* Reply The Comment  */}
          </div>
          <div className="mt-2 w-full">
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
                value={Comment}
                onChange={(e) => {
                  setComment(e.target.value);
                }}
                placeholder="Add a Reply"
                className="h-full w-full border-none outline-none md:text-lg text-xs px-2  bg-transparent"
              />
              <button onClick={PostComment} className="md:text-xl">
                <RiTwitchLine title=" Post Reply" />
              </button>
            </div>
          </div>

          <div className={` flex-col gap-2 ${ShowReplies ? "flex" : "hidden"}`}>
            {data?.Replies?.map((itm) => (
              <Replies key={itm?._id} data={itm} postId={postId} commentId={data._id} />
            ))}
          </div>

          <button
            onClick={ToggleShowReplies}
            className={`w-32 text-blue-600 font-semibold md:text-sm text-sm rounded-md ${
              data?.Replies?.length > 0 ? "" : "hidden"
            } `}
          >
            {ShowReplies
              ? "Hide Replies"
              : " Show Replies " + data?.Replies?.length}
          </button>
        </div>
        <div className="w-12 h-full flex flex-col items-center text-xs pt-0">
          <button
            onClick={manageLike}
            className={`text-xl ${isOwnComment ? "hidden" : ""}`}
          >
            {isLiked ? <FaHeart className="text-red-600" /> : <CiHeart />}

            {Likes}
          </button>

          <div className={`text-xl ${!isOwnComment ? "hidden" : ""} relative`}>
            <button
              className="transition-all duration-300"
              onClick={() => {
                setshowOptions(!showOptions);
              }}
            >
              {!showOptions ? <CiMenuKebab /> : <RxCross1 />}
            </button>

            {/* Options for Editing  */}

            <div
              className={` rounded w-32 items-center z-20  flex-col gap-1 text-sm absolute top-0 right-4 ${
                !showOptions ? "hidden" : "flex"
              }`}
            >
              <button
                onClick={() => {
                  if (isEditing) {
                    setisEditing(false);
                    setEditComment("");
                  } else {
                    setisEditing(true);
                    setEditComment(data?.Text);
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

export default Comment;
