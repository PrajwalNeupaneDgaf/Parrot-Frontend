import React from "react";
import Post from "./Post";

const Posts = ({ Posts ,isOwnPost , hidePosts}) => {

  if(!Posts || Posts?.length==0){
    return(
      <div className="text-center mt-6 scale-y-125 text-2xl">
        NO POST AVAILABLE!
      </div>
    )
  }
  return (
    <div className="mb-8 bg-gray-50">
      <div className={`text-xl font-semibold px-4 py-2 text-gray-800 ${hidePosts?'hidden':''}`}>Posts</div>
      <div className="flex flex-col gap-4 md:px-4 h-fit py-3 rounded-lg mx-3 bg-white shadow-lg">
        {Posts?.map((itm) => (
          <Post key={itm._id} itm={itm} isOwnPost={isOwnPost}/>
        ))}
      </div>
    </div>
  );
};

export default Posts;
