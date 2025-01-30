import React from "react";
import { useParams } from "react-router-dom";
import fetcher from "../Utils/axios";
import toastr from "toastr";
import { RxCross2 } from "react-icons/rx";
import { IoMdCheckmark } from "react-icons/io";


const GroupRequests = ({ data,trigger}) => {
  const { id } = useParams();
  const handleReq = (userId, status) => {
    fetcher
      .post(`group/manage-request/${id}`, {
        requestId: userId,
        status: status,
      })
      .then((res) => {
        toastr.success(res.data.message || 'Succesfull');
        trigger.setTrigger(!trigger.trigger);
      })
      .catch((err) => {
        toastr.error(err.response.data.message || "Error");
        console.log(err)
      });
  };

  return (
    <div>
      <div>
        <b className="text-xl text-gray-800">Requests</b>
      </div>
      <div className="overflow-auto">
        {data && data.length > 0 ? (
          <div className="flex flex-col gap-2">
            {data.map((itm) => (
              <div
                key={itm?._id}
                className="py-1 px-2 gap-2 flex items-center justify-between bg-gray-300 rounded"
              >
                {/* User Info */}
                <div className="flex flex-row gap-2 items-center">
                  <div>
                    <img
                      onClick={() => {
                        navigate(`/profile/${itm?._id}`);
                      }}
                      src={itm?.profile}
                      alt="error"
                      className="h-12 w-12 object-cover rounded-full cursor-pointer transition-all duration-300 hover:scale-110"
                    />
                  </div>
                  <b className="text-sm md:text-lg">{itm?.name}</b>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleReq(itm?._id, true)}
                    className="px-3 flex items-center py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-all duration-300"
                  >
                   <span className="hidden md:block"> Accept</span> <span className="flex md:hidden items-center text-xl"><IoMdCheckmark /></span>
                  </button>
                  <button
                    onClick={() => handleReq(itm?._id, false)}
                    className="px-3 py-1 flex items-center bg-red-500 text-white rounded hover:bg-red-600 transition-all duration-300"
                  >
                   <span className="hidden md:block"> Reject</span> <span className="flex md:hidden items-center text-xl"><RxCross2 /></span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-2xl text-center py-4 text-gray-400">
            NO REQUESTS!
          </div>
        )}
      </div>
    </div>
  );
};

export default GroupRequests;
