import React from "react";
import { useNavigate } from "react-router-dom";

const ShowFriends = ({ data,setTrigger }) => {
  if (!data || data?.length === 0) {
    return (
      <div className="flex justify-center items-center text-3xl text-gray-500 h-40">
        No Friends to Show!
      </div>
    );
  }

  const navigate = useNavigate();

  return (
    <div className="w-full px-4 space-y-4">
      {data.map((itm, idx) => (
        <div
          className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-4"
          key={idx}
        >
          {/* Profile Picture */}
          <div className="w-fit flex items-center">
            <img
              onClick={() => navigate(`/profile/${itm._id}`)}
              src={itm?.profile}
              className="cursor-pointer h-16 w-16 object-cover rounded-full border-2 border-white shadow-sm hover:scale-105 transition-transform duration-200"
              alt="Profile"
            />
          </div>

          {/* User Info */}
          <div className="flex flex-col justify-center text-white">
            <b className="text-lg md:text-xl">{itm.name}</b>
            <p className="text-sm mt-1">
              <b>Total Friends</b> ({itm?.friends?.length || 0})
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShowFriends;
