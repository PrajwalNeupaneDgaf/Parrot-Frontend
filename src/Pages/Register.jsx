import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UseCreatedContext } from "../Context/UserContext";
import toastr from 'toastr'
import fetcher from "../Utils/axios";

const Register = () => {
  const navigate = useNavigate();

  const { isLoggedIn, setIsLoggedIn,setUser } = UseCreatedContext();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, []);

  //Actual Data to save and Used

  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");
  const [name, setname] = useState('')
  const [error, seterror] = useState('') 
   const [Loading, setLoading] = useState(false) 


  const handleSubmit = async (e)=>
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
    try {
       const data = await fetcher.post('user/register',{
        name:name,
        email:email,
        password:password
       })
       setUser(data.data.user)

       setIsLoggedIn(true)

       navigate('/verify-your-email')
       toastr.success('You Have Successfully Logged In')
    } catch (error) {
      toastr.error("SomeThing Went Wrong")
    } finally{
      setLoading(false)
    }
  }


  return (
    <div className="h-[100vh] w-[100vw] flex justify-center items-center">
      <div className="w-[90%] md:w-[50rem] bg-black bg-opacity-15 rounded-lg h-fit py-6 shadow-xl">
        <div className="text-center font-sans py-3 font-bold text-2xl text-gray-800">
          <h1>Register</h1>
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
              htmlFor="name"
              className="text-lg font-semibold"
              >Name:</label>
              <input 
              type="text" 
              id="name" 
              value={name} 
              onChange={(e)=>{
                setname(e.target.value)
              }} 
              className="py-3 px-3 md:w-[24rem] w-[17rem] text-lg border-white outline-none bg-black bg-opacity-35 rounded-lg"
              required
              />
            </div>
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
            <div className="flex flex-col">
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
              className="py-3 px-3 md:w-[24rem] w-[17rem] text-lg border-white outline-none bg-black bg-opacity-35 rounded-lg"
              required
              />
            </div>
            <div className="text-green-600">
              Do have an account?<b className="cursor-pointer text-black" onClick={()=>{
                navigate('/login')
              }}>Login</b>
            </div>
            <div>
              <button className={`text-white font-bold text-lg py-2 px-24 rounded-lg ${Loading?'cursor-wait bg-orange-100':'bg-orange-400'} `} type="submit">Register</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
