import React, { useState } from "react";
import toastr from 'toastr'
import fetcher from "../Utils/axios";

const ManagePassword = ({ display, setDisplay }) => {

    const [newPassword, setNewPassword] = useState('')
    const [oldPassword, setoldPassword] = useState('')

    const acceptFun = ()=>{
        if(newPassword.length<6){
            toastr.error('Minimum 6 Digits Password')
            return
        }
        fetcher.put('user/updateid/password',{
            newPassword:newPassword,
            oldPassword:oldPassword
          })
          .then((res)=>{
            toastr.success("Password Changed Successfully")
            setNewPassword('')
            setoldPassword('')
          })
          .catch(err=>{
            console.log(err)
            toastr.error(err.response.data.message || 'Something went wrong')
          })
    }
  return (
    <div
      className={`fixed top-0 left-0 right-0 bottom-0 z-50 justify-center  ${
        display ? "flex" : "hidden"
      } backdrop-blur-sm`}
    >
      <div className="p-5 mt-[10vh] bg-black bg-opacity-35 h-fit rounded-lg md:w-96 w-[90%]">
        <div>
            <b className="text-center w-full">
              Change Password
            </b>
            <p className="text-xs font-semibold">
                *enter passwords once you accept password will be changed*
            </p>
            <b className="mt-4">
                New Password:
            </b>
            <input type="password"
            value={newPassword}
            onChange={(e)=>{
                setNewPassword(e.target.value)
            }}
            placeholder="Enter New Name"
            className="outline-none border border-solid border-black w-full bg-inherit  p-1 rounded-md py-2"
            />
            <b className="mt-4">
                Old Password:
            </b>
            <input type="password"
            value={oldPassword}
            onChange={(e)=>{
                setoldPassword(e.target.value)
            }}
            placeholder="Enter New Name"
            className="outline-none border border-solid border-black w-full bg-inherit  p-1 rounded-md py-2"
            />
        </div>
        <div className="w-full flex justify-end px-3 mt-4 gap-3">
          <button
            onClick={() => {
              setNewPassword('')
              setoldPassword('')
              setDisplay(false);
            }}
            className="px-4 py-2 bg-black text-white rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              acceptFun();
              setDisplay(false);
            }}
            className="px-4 py-2 bg-blue-700 text-white rounded-md"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManagePassword;
