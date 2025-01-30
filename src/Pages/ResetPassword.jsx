import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toastr from "toastr";
import { UseCreatedContext } from "../Context/UserContext";
import fetcher from "../Utils/axios";

const ResetPassword = () => {
  const { token } = useParams();
  const [Loading, setLoading] = useState(false);
  const [newPassword, setnewPassword] = useState("");

  const { User, isLoggedIn } = UseCreatedContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, []);

  const submitFunction = () => {
    if(newPassword.length<6){
        return toastr.error("Minimum 6 digit required")
    }
    setLoading(true)
    fetcher.post('user/reset-password',{
        token:token,
        newPassword:newPassword
    })
    .then(res=>{
        toastr.success("Password Changed Succesfully")
        navigate('/login')
    }).catch(err=>{
        toastr.error(err.response.data.message||'Something went wrong try again')
        console.log(err)
    })
    .finally(()=>{
        setLoading(false)
    })
  };
  return (
    <div className="h-full w-full flex justify-center items-center pt-[12vh]">
      <div className="bg-[#fdeeee] rounded-md p-4 px-12 flex flex-col gap-2 max-w-[33rem] w-[70%]">
        <b>Enter New Password:</b>
        <input
          value={newPassword}
          onChange={(e) => {
            setnewPassword(e.target.value);
          }}
          type="password"
          placeholder="Enter New Password"
          className="p-2 bg-transparent outline-none border-solid border-black border-[1px] rounded-md"
        />

        <button
            onClick={()=>{
                if(!Loading && newPassword){
                    submitFunction()
                }
            }}
          className={`bg-green-500 py-2 rounded-lg text-white ${
            Loading ? "cursor-wait" : ""
          }`}
        >
          {Loading ? "Loading" : "Change Password"}
        </button>
        <p className="text-xs">
          <b>Note:</b>
          &nbsp; Invalid Token And Changed in URL may cause Failure And Don't
          Share Password
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
