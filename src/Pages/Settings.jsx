import React, { useState } from 'react'
import Layout from '../Layout/Layout'
import { UseCreatedContext } from '../Context/UserContext'
import { useNavigate } from 'react-router-dom'
import toastr from 'toastr'
import fetcher from '../Utils/axios'
import Notify from '../Components/Notify'
import ChangeName from '../Components/ChangeName'
import ManagePassword from '../Components/ManagePassword'
import { MdEdit } from "react-icons/md";

const Settings = () => {
  const [Display, setDisplay] = useState(false)
  const [changeName, setchangeName] = useState(false)
  const [changePassword, setchangePassword] = useState(false)
  const {User,isLoggedIn,setIsLoggedIn,setIsVerified} = UseCreatedContext()
  const navigate = useNavigate()

  const handleLogout = () => {
    fetcher.get('user/logout')
    .then(()=>{
      setUser({})
      setIsLoggedIn(false)
      setIsVerified(false)
      toastr.success("You Are Logged Out")
    }).catch(err=>{
      toastr.error(err.response.data.message || "You Are Unable To Logout")
      console.log(err)
    }).finally(()=>{
      location.reload()
    })
  };
  return (
   <Layout>
     <div className='flex justify-center items-center'>
        <div className='w-[50rem] md:shadow-lg shadow-black md:px-8 px-3 py-5 md:py-12'>
           <div className='flex justify-between items-center pb-4'>
           <h2 className='md:text-2xl text-green-700 text-xl font-bold text-left cursor-default'>
              Settings
            </h2>
            <img onClick={()=>{
               navigate(`/profile/${User?._id}`)
            }} src={User?.profile} alt="Profile" className='hover:scale-110 transition-all duration-500 cursor-pointer h-12 w-12 rounded-full object-cover'/>
           </div>
            <div className='h-full w-full flex flex-col justify-center gap-3 items-center font-mono'>
               <div onClick={()=>{
                navigate(`/profile/${User?._id}`)
               }} className='bg-gray-100 py-3 text-center cursor-pointer shadow-md w-full rounded-lg hover:bg-gray-200'>
                  Visit Your Profile
               </div>
               <div onClick={()=>{
                setchangePassword(true)
               }} className='bg-gray-100 py-3 text-center cursor-pointer shadow-md w-full rounded-lg hover:bg-gray-200'>
                  Manage Your Password
               </div>
               <div onClick={()=>{
                navigate('/settings/manage/photos')
               }} className='bg-gray-100 py-3 text-center cursor-pointer shadow-md w-full rounded-lg hover:bg-gray-200'>
                  Manage Your Photos
               </div>
               <div onClick={()=>{
                  setchangeName(true)
               }} className='bg-gray-100 py-3 text-center cursor-pointer shadow-md w-full rounded-lg hover:bg-gray-200'>
                  Change Name
               </div>
               <div onClick={()=>{
                  navigate('/groups')
               }} className='bg-gray-100 py-3 text-center cursor-pointer shadow-md w-full rounded-lg hover:bg-gray-200'>
                  Your Groups
               </div>
               <div onClick={()=>{
                setDisplay(true)
               }} className='bg-gray-100 text-red-600 py-3 text-center cursor-pointer shadow-md w-full rounded-lg hover:bg-gray-200'>
                  Logout
               </div>
               <div onClick={()=>{
                alert("Currently You Can't")
               }} className='bg-black text-red-600  py-3 text-center cursor-pointer shadow-md w-full font-bold rounded-lg hover:text-red-900'>
                  Delete ID
               </div>
            </div>
        </div>
     </div>
     <Notify display={Display} setDisplay={setDisplay} acceptFun={handleLogout} Title={'Logout This Account'} data={'Are you sure? You want to logout from this Session.'}/>
     <ChangeName display={changeName} setDisplay={setchangeName}/>
     <ManagePassword display={changePassword} setDisplay={setchangePassword}/>
   </Layout>
  )
}

export default Settings