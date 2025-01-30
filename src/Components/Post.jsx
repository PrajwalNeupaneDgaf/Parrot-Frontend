import React, { useEffect, useState } from "react";
import { CiHeart, CiShare2 } from "react-icons/ci";
import { FaComment } from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { UseCreatedContext } from "../Context/UserContext";
import fetcher from "../Utils/axios";
import toastr from "toastr";
import { RiTwitchLine } from "react-icons/ri";

const Post = ({ itm , setTrigger }) => {
  const navigate = useNavigate();

  const [Text, setText] = useState([]);
  const [Likes, setLikes] = useState(itm?.LikedBy?.length);

  const [isOwnPost, setisOwnPost] = useState(false)

  const [Comment, setComment] = useState();

  const [isLiked, setIsLiked] = useState(false);

  const { User } = UseCreatedContext();

  useEffect(() => {
    if (itm.Text) {
      let text = itm.Text;
      let fmText = text.split("\n");
      setText(fmText);
      setisOwnPost(itm.PostedBy._id===User._id)
    }
  }, [itm]);

  useEffect(() => {
    if (itm.LikedBy?.includes(User._id) || itm?.LikedBy?.some(itm=>itm._id===User._id)) {
      setIsLiked(true);
    }
  }, []);

  const handleLike = () => {
    fetcher
      .get(`/post/like/${itm._id}`)
      .then((res) => {
        setLikes(isLiked ? Likes - 1 : Likes + 1);
        setIsLiked(!isLiked);
      })
      .catch((err) => {
        toastr.error("Try Again");
      });
  };

  const formatRelativeTime = (date) => {
    if (!date) {
      return;
    }
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  };

  const handleClick = (link) => {
    const data = link.split("/");
    let version = data[6];
    let id = data[7];
    let file = data[8];

    navigate(`/image/${version}/${id}/${file}`);
  };

  const PostComment = ()=>{
    if(!Comment){
      return 
    }
   fetcher.post(`/post/addComment/${itm._id}`,{
    Text:Comment
   })
   .then((res)=>{
    setComment('')
    toastr.info("Commented")
    setTrigger?setTrigger(prev=>!prev):''
   }).catch((err)=>{
    console.log(err)
    toastr.error(err.response.data.message || "Somethimg went Wrong")
   })
  }

  return (
    <div>
      <div
        key={itm._id}
        className="border-solid border-gray-300 border-[1px] rounded-lg p-4 shadow-sm hover:shadow-xl transition-all duration-300 ease-in-out"
      >
        <div className="h-16 flex items-center gap-3">
          <img
            onClick={() => {
             if(itm.PostedAt){
              navigate(`/group/visit/${itm.PostedAt._id}`);
             }else{
              navigate(`/profile/${itm.PostedBy._id}`);
             }
            }}
            src={itm.PostedAt?itm.PostedAt.Profile:itm.PostedBy?.profile}
            alt="Profile"
            className="h-14 w-14 rounded-full object-cover cursor-pointer border-2 border-gray-200 hover:border-green-500 transition-all duration-200"
          />
          <div className="flex w-full justify-between pr-3">
            <div className="flex flex-col">
            {
                itm.PostedAt?<p onClick={()=>{
                  navigate(`/group/visit/${itm.PostedAt._id}`)
                }} className="text-lg cursor-pointer text-green-900 font-bold font-sans ">
                  {itm.PostedAt.Name}
                </p>:''
              }
              <b onClick={() => {
              navigate(`/profile/${itm.PostedBy._id}`);
            }} className={` ${itm.PostedAt?"text-sm text-gray-900 flex flex-row gap-1 items-center":'text-green-900  text-lg'} cursor-pointer`}>{!itm.PostedAt?"":<img src={itm?.PostedBy?.profile} alt="error" className="h-6 w-6  object-center object-contain bg-black rounded-full"/>}{itm.PostedBy?.name}</b>
              <p className="text-xs font-semibold text-gray-500">
                {formatRelativeTime(itm?.createdAt)}
              </p>
            </div>
            <div className={`${isOwnPost ? "block" : "hidden"}`}>
              <CiEdit
                onClick={() => {
                  navigate(`/post/edit/${itm._id}`);
                }}
                className="text-xl cursor-pointer"
              />
            </div>
          </div>
        </div>
        <div className="w-full mt-3">
          {itm.Image ? (
            <p>
              {Text.map((itm, idx) => (
                <p key={idx}>
                  {itm} <br />
                </p>
              ))}
            </p>
          ) : (
            <b>
              {Text.map((itm, idx) => (
                <p key={idx}>
                  {itm} <br />
                </p>
              ))}
            </b>
          )}
          <img
            onClick={() => {
              handleClick(itm.Image);
            }}
            className={`${
              itm.Image ? "" : "hidden"
            } w-full max-h-96 object-contain mt-4 rounded-lg shadow-md transition-all duration-300 ease-in-out`}
            src={itm.Image}
            alt=""
            loading="lazy"
          />
        </div>
        <div className="flex justify-between md:px-6 py-2 mt-4 rounded-lg bg-gray-100">
          <button
            onClick={handleLike}
            className={`flex flex-row gap-2 items-center px-3 md:px-5 py-2 rounded-lg ${
              isLiked
                ? "bg-green-900 text-white"
                : "hover:bg-green-100 hover:text-green-800"
            } font-semibold text-gray-600  transition-all duration-200`}
          >
            <CiHeart className="text-xl" />
            <b className="text-xs md:text-sm flex flex-row items-center">
              <p className="text-xs">{Likes}</p>{" "}
            </b>
          </button>
          <button
          title="View Comments"
            onClick={() => {
              navigate(`/post/details/${itm._id}`);
            }}
            className="flex flex-row gap-2 items-center px-3 md:px-5 py-2 rounded-lg font-semibold text-gray-600 hover:bg-blue-100 hover:text-blue-800 transition-all duration-200"
          >
            <FaComment />
            <b className="text-xs md:text-sm">Comment({itm.Comments?.length})</b>
          </button>
          <button className="flex flex-row gap-2 items-center px-3 md:px-5 py-2 rounded-lg font-semibold text-gray-600 hover:bg-yellow-100 hover:text-yellow-800 transition-all duration-200">
            <CiShare2 />
            <b className="text-xs md:text-sm">Share</b>
          </button>
        </div>
      </div>
      <div className="h-16 w-full bg-gray-200 mt-1 rounded-md p-[1.9px] flex flex-row px-2 items-center  gap-2">
        <img onClick={()=>{
          navigate(`/profile/${User._id}`)
        }} src={User.profile} alt="Profile" className=" object-cover h-12 w-12 bg-black rounded-full hover:scale-110 transition-all duration-200 cursor-pointer"/>
        <input
          type="text"
          value={Comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
          placeholder="Add a Comment"
          className="h-full w-full border-none outline-none text-lg px-2  bg-transparent"
        />
       <button  onClick={PostComment} className="text-xl">
       <RiTwitchLine title=" Post Comment"/>
       </button>
      </div>
    </div>
  );
};

export default Post;
