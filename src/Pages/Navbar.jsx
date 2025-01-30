import React, { useEffect, useState } from 'react'
import { FaHome, FaUserFriends, FaEnvelope, FaBell, FaCog, FaSearch } from 'react-icons/fa';
import { CiSearch } from "react-icons/ci";
import {useNavigate} from 'react-router-dom'

const Navbar = () => {

  const navigate = useNavigate()

  const [Active, setActive] = useState('')
  const [query, setquery] = useState('')
  const navbars = [
    {
      id: 1,
      label: 'Home',
      path: '/', // The route this navbar item links to
      icon: <FaHome />, // React Icon for "Home"
    },
    {
      id: 2,
      label: 'Friends',
      path: '/friends',
      icon: <FaUserFriends />, // React Icon for "Friends"
    },
    {
      id: 3,
      label: 'Messages',
      path: '/messages',
      icon: <FaEnvelope />, // React Icon for "Messages"
    },
    {
      id: 4,
      label: 'Notifications',
      path: '/notifications',
      icon: <FaBell />, // React Icon for "Notifications"
    },
    {
      id: 51,
      label: 'Setting',
      path: '/settings',
      icon: <FaCog />, // React Icon for "Settings"
    },
  ];
  
  useEffect(()=>{
    const link = location.pathname
    const exact = '/'+link.split('/')[1]
    setActive(exact)
  },[])

  const Search =()=>{
    if(query){
      navigate(`/search/${query}`)
    }
  }
  return (
    <div className='flex lg:flex-row flex-col fixed gap-2 z-30 top-0 left-0 right-0 md:px-6 px-2 justify-between  py-4 bg-green-200 '>
        <div className='flex flex-row justify-between items-center w-full'>
        <div className='flex items-center text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-700 via-green-400 to-green-950'>
           PARROT
           </div>
           <div className='mx-3 border-2 border-solid border-black w-full max-w-[25rem] rounded flex items-center'>
                <input onKeyDown={(e)=>{
                  let buttons = e.key
                  if(buttons==='Enter'){
                    Search()
                  }
                }} id='Search' onChange={(e)=>{
                  setquery(e.target.value)
                }} value={query} placeholder='Search Parrot' type="search" className=' h-full w-full py-1 px-2 border-none outline-none bg-transparent' />
                <CiSearch onClick={Search}  className='cursor-pointer h-full text-2xl '/>
           </div>
       
        </div>
        <div className=' lg:justify-center justify-between items-center flex gap-6 px-3'>
          {
            navbars.map(itm=>{
              return(
                <div onClick={()=>{
                  navigate(itm.path)
                }} key={itm.id}
                className={` ${Active==itm.path?'text-pink-800':''} cursor-pointer text-[1rem] font-semibold  flex justify-center items-center gap-1`}
                >
                    <span className='text-xl sm:text-[1rem]'>{itm.icon}</span> <span className='sm:block hidden'>{itm.label}</span>
                </div>
              )
            })
          }
        </div>
    </div>
  )
}

export default Navbar