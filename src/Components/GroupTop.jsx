import React, { useState } from "react";
import { FaUserFriends, FaCogs } from "react-icons/fa";
import { MdGroupAdd } from "react-icons/md";
import { ImExit } from "react-icons/im";
import Notify from "./Notify";
import fetcher from "../Utils/axios";
import toastr from "toastr";

const GroupTop = ({
  data,
  isCreator,
  setisEditMode,
  setisRequestMode,
  isMember,
  setIsMember,
  request
}) => {

  const [isDisplay, setisDisplay] = useState(false)
  const [CancelReq, setCancelReq] = useState(false)
  const [isLeaving, setisLeaving] = useState(false)

  const JoinGroup = ()=>{
    fetcher.get(`group/join/${data._id}`)
    .then(res=>{
      toastr.success(res?.data?.message || 'Successfully Requested')
     const data = res.data
     if(data.isJoined){
      setIsMember(true)
     }else{
      request.setIsRequested(true)
     }
    }).catch(err=>{
      toastr.error(err.response.data.message||'error')
    })
  }

  const LeaveGroup = ()=>{
    if(!isMember){
      return
    }
    fetcher.get(`group/leave/${data._id}`)
    .then(res=>{
      toastr.success(res?.data?.message || 'Successfully Left')
      setIsMember(false)
    }).catch(err=>{
      toastr.error(err.response.data.message||'error')
      console.log(err)
    })
  }

  const reqCancel = ()=>{
    fetcher.get(`group/cancel/${data._id}`)
    .then(res=>{
      toastr.success(res?.data?.message || 'Successfully Canceled')
      request.setIsRequested(false)
    }).catch(err=>{
      toastr.error(err.response.data.message||'error')
    })
  }
  return (
    <div className="flex flex-row justify-between px-4 md:px-8 py-3 w-full bg-gradient-to-r from-blue-400 to-blue-700 items-center  shadow-md">
      {/* Group Info */}
      <div className="flex items-center gap-3">
        <img
          src={data?.Profile || "https://via.placeholder.com/150"}
          alt={data?.Name || "Group Avatar"}
          className="rounded-full h-14 w-14 object-cover border-2 border-white shadow-sm"
        />
        <div>
          <b className="text-white text-lg">{data?.Name || "Group Name"}</b>
          <p className="text-gray-300 text-sm">
            {data?.Members?.length + " Members"}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      {isCreator && (
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setisRequestMode(true);
            }}
            className="p-2 bg-transparent text-gray-300 hover:text-white hover:bg-blue-700 rounded-full transition duration-300"
            title="Requests"
          >
            <FaUserFriends size={20} />
          </button>
          <button
            onClick={() => {
              setisEditMode(true);
            }}
            className="p-2 bg-transparent text-gray-300 hover:text-white hover:bg-blue-700 rounded-full transition duration-300"
            title="Manage"
          >
            <FaCogs size={20} />
          </button>
        </div>
      )}
      {!isCreator && (
        <div className="flex items-center gap-3">
          {isMember ? (
            <button
              onClick={() => {
                setisLeaving(true)
              }}
              className="p-2 bg-transparent text-gray-300 hover:text-white hover:bg-blue-700 rounded-full transition duration-300"
              title="Leave"
            >
              <b className="flex items-center">
                <ImExit /> &nbsp; Exit
              </b>
            </button>
          ) : (
            <button
              onClick={() => {
                if(request.isRequested){
                  setCancelReq(true)
                }else{
                  setisDisplay(true)
                }
              }}
              className="p-2 bg-transparent text-gray-300 hover:text-white hover:bg-blue-700 rounded-full transition duration-300"
              title="Join"
            >
              <p className="flex items-center">
               {
                request.isRequested?'Requested': <b className="flex items-center gap-1"><MdGroupAdd /> Join</b>
               }
              </p>
            </button>
          )}
        </div>
      )}
      <Notify display={isDisplay} setDisplay={setisDisplay} Title={'Join Group'} acceptFun={JoinGroup} data={`Do you want to join group; ${data.Name}`}/>
      <Notify display={CancelReq} setDisplay={setCancelReq} Title={'Cancel Request'} acceptFun={reqCancel} data={`Do you want to Cancel Your join group; ${data.Name} Request`}/>
      <Notify display={isLeaving} setDisplay={setisLeaving} Title={'Leave Group'} acceptFun={LeaveGroup} data={`Do you want to Leave Your group; ${data.Name}`}/>
    </div>
  );
};

export default GroupTop;
