import React, { useEffect, useState } from "react";
import toastr from 'toastr'
import { useNavigate } from "react-router-dom";
import { UseCreatedContext } from "../Context/UserContext";
import fetcher from "../Utils/axios";

const Login = () => {
  const navigate = useNavigate();

  const { isLoggedIn,setIsLoggedIn ,setIsVerified} = UseCreatedContext();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, []);

  //Actual Data to save and Used

  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");
  const [error, seterror] = useState('')
  const [Loading, setLoading] = useState(false)
  const [forgetPasswordClicked, setForgetPasswordClicked] = useState(false)



  const handleSubmit = (e)=>
  {
    if(Loading){
      return
    }
    e.preventDefault();
    setLoading(true)
    if(password.length<6){
      seterror("Password Length Should be Atleast of 6 Character")
      return
    }
    fetcher.post('user/login',{
      email:email,
      password:password
    })
    .then((res)=>{
      const data = res.data.user
      setIsLoggedIn(true)
      setIsVerified(data.isVerified)
      navigate('/')
    }).catch(err=>{
      toastr.error(err.response?.data.message || 'Sorry Some Error Occured')
    }).finally(()=>{
      setLoading(false)
    })
  }
   
  const handleForgetPassword = ()=>{
    if(!email){
     return toastr.error('Email is Required')
    }
    setForgetPasswordClicked(true)
    fetcher.post('user/forget-password',{
      email:email
    })
    .then(res=>{
      toastr.success('check your mailbox')
    }).catch(err=>{
      toastr.error(err.response.data.message || 'Something Went Wrong')
    }).finally(()=>{
      setForgetPasswordClicked(false)
    })
  }
  return (
    <div className="h-[100vh] w-[100vw] flex justify-center items-center">
      <div className="w-[90%] md:w-[50rem] bg-black bg-opacity-15 rounded-lg h-fit py-6 shadow-xl">
        <div className="text-center font-sans py-3 font-bold text-2xl text-gray-800">
          <h1>LOGIN</h1>
        </div>
        <div className={`text-sm text-red-600 text-center ${error?'block':'hidden'}`}>
          *{error}
        </div>
        <form onSubmit={(e)=>{
          handleSubmit(e)
        }}>
          <div className="h-full w-full flex justify-start items-center py-4 flex-col gap-4">
            <div className="flex flex-col">
              <label 
              htmlFor="email"
              className="text-lg font-semibold"
              >Email:</label>
              <input 
              type="email" 
              id="email" 
              value={email} 
              onChange={(e)=>{
                setemail(e.target.value)
              }} 
              className="py-3 px-3 md:w-[24rem] w-[17rem] text-lg border-white outline-none bg-black bg-opacity-35 rounded-lg"
              required
              />
            </div>
            <div
            className="flex flex-col"
            >
              <label 
              htmlFor="password"
              className="text-lg font-semibold"
              >Password:</label>
              <input 
              type="password" 
              id="password" 
              value={password} 
              onChange={(e)=>{
                setpassword(e.target.value)
              }} 
              className="py-3 px-3  md:w-[24rem] w-[17rem] text-lg border-white outline-none bg-black bg-opacity-35 rounded-lg"
              required
              />
            </div>
            <div className={`${forgetPasswordClicked?'text-blue-400':'text-blue-900'}`}>
             <b className="cursor-pointer" onClick={()=>{
              if(!forgetPasswordClicked ){
                handleForgetPassword()
              }
             }}> Forget Password?</b>
            </div>
            <div className="text-green-600">
              Dont't have an account?<b className="cursor-pointer text-black" onClick={()=>{
                navigate('/register')
              }}>Register</b>
            </div>
            <div>
            <button className={`text-white font-bold text-lg py-2 px-24 rounded-lg ${Loading?'cursor-wait bg-orange-100':'bg-orange-400'} `} type="submit">Login</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
