import React, { useState } from "react";
import fetcher from "../Utils/axios";
import toastr from "toastr";
import { UseCreatedContext } from "../Context/UserContext";

const ChangeName = ({ display, setDisplay }) => {

    const [newName, setnewName] = useState('')

    const {User,setUser} = UseCreatedContext()

    const acceptFun = ()=>{
        fetcher.put('user/updateid/name',{
          name:newName
        })
        .then((res)=>{
          toastr.success("Name Changed Successfully")
          let user = User
          user.name = newName
          setUser(user)
          setnewName('')
        })
        .catch(err=>{
          toastr.error('Couldnot change the name ')
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
            <b>
                Enter Your New Name
            </b>
            <p className="text-xs font-semibold">
                *enter name below once you accept name will be changed*
            </p>
            <input type="text"
            value={newName}
            onChange={(e)=>{
                setnewName(e.target.value)
            }}
            placeholder="Enter New Name"
            className="outline-none border border-solid border-black w-full bg-inherit my-4  p-1 rounded-md py-2"
            />
        </div>
        <div className="w-full flex justify-end px-3 gap-3">
          <button
            onClick={() => {
                setnewName('')
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

export default ChangeName;
