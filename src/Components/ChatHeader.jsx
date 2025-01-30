import React, { useState } from 'react'
import { RxCross1 } from "react-icons/rx";
import { CiMenuKebab } from "react-icons/ci";
import { useChat } from '../Context/ChatContext';
import { useNavigate } from 'react-router-dom';
import Notify from './Notify';
import toastr from 'toastr';
import fetcher from '../Utils/axios';

const ChatHeader = () => { 
  const [ShowMenu, setShowMenu] = useState(false)
  const [isDisplay, setisDisplay] = useState(false)
  const navigate = useNavigate()
  const {ActiveFriend,setActiveChats} = useChat()

  const deleteChat = async()=>{
    try {
      await fetcher.delete(`message/all/${ActiveFriend._id}`)
      toastr.info('Chat deleted')
      setActiveChats([])
      setShowMenu(false)
    } catch (error) {
      console.log(error)
      toastr.error(error?.response?.data?.message || "Sorry try again")
    }
  }
  return (
    <div className='flex flex-row fixed lg:top-16 top-[5.9rem] left-0 right-0 px-2 py-2  z-20 bg-gray-200 justify-between'>
      <div className='flex flex-row gap-2 items-center cursor-pointer'>
          <img onClick={()=>{
            navigate(`/profile/${ActiveFriend?._id}`)
          }} src={ActiveFriend?.profile} alt="Error" className='object-cover bg-black h-12 w-12 rounded-full'/>
          <b>
          {ActiveFriend?.name || 'XXXXXXXXXX'}
          </b>
      </div>
      <div className='text-xl items-center flex'>
        <button  onClick={()=>setShowMenu(!ShowMenu)}>
       {
        ShowMenu?<RxCross1 />:  <CiMenuKebab />
       } 
      
        </button>
      </div>
      <button onClick={()=>{
        setisDisplay(true)
      }} className={`${ShowMenu?'':"hidden"} absolute h-12 w-44 bg-gray-300 border border-solid border-white rounded right-8`}>
       Delete Chat
      </button>
      <Notify acceptFun={deleteChat} display={isDisplay} setDisplay={setisDisplay} Title={'Delete'} data={`Do you want to delete the Chat with ${ActiveFriend.name}`}/>
    </div>
  )
}

export default ChatHeader