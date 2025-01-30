import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toastr from 'toastr'
import fetcher from '../Utils/axios'
import { UseCreatedContext } from '../Context/UserContext'
import Notify from './Notify'

const PersonalInfo = ({user,isOwnId,isFriend ,setIsFriend,usefullData,isRequested,setIsRequested , isRequestReceived}) => {
   const navigate = useNavigate()

   const {User}= UseCreatedContext()
   const [Loading, setLoading] = useState(false)
   const [display, setdisplay] = useState(false)


   const sendRequest = ()=>{
    if(Loading){
        return
    }
    setLoading(true)
    fetcher.get(`friend/send-request/${user._id}`)
    .then(res=>{
        setIsRequested(true)
    })
    .catch(err=>{
        toastr.error(err.response.data.message || "Something Went Wrong")
    }).finally(()=>{
        setLoading(false)
    })
   }
   const cancelRequest = ()=>{
    if(Loading){
        return
    }
    setLoading(true)
    fetcher.post(`friend/cancel-request`,{
        sender:User._id,
        receiver:user._id
    })
    .then(res=>{
        setIsRequested(false)
    })
    .catch(err=>{
        toastr.error(err.response.data.message || "Something Went Wrong")
    }).finally(()=>{
        setLoading(false)
    })
   }

   const handleUnfriend = ()=>{
    if(Loading){
        return
    }
    setLoading(true)
    fetcher.post(`friend/unfriend/${user._id}`)
    .then(res=>{
        setIsFriend(prev=>!prev)
    })
    .catch(err=>{
        toastr.error(err.response.data.message || "Something Went Wrong")
    }).finally(()=>{
        setLoading(false)
    })
   }
  return (
    <div className='p-4 grid md:grid-cols-2 gap-5'>
    <div className='flex flex-col justify-center items-center'>
    <img className='h-64 w-64 shadow-2xl rounded-full object-cover' src={user?user?.profile:"https://nld.co.za/wp-content/uploads/2014/08/Profile-Pic-Demo.png"} alt="" />
    <table>
                <tr>
                    <th>
                        <b>
                            Name:
                        </b>
                    </th>
                    <th className=' pl-3 text-left'>
                        {user?user?.name:""}
                    </th>
                </tr>
                <tr className={`${isOwnId?'text-sm opacity-95':'hidden'}`}>
                    <th>
                        <b>
                            Email:
                        </b>
                    </th>
                    <th className=' pl-3 text-left'>
                        {user?user?.email:""}
                    </th>
                </tr>
            </table>
        <div className='flex gap-2 md:flex-row flex-col justify-center items-center '>
           <div className={`${isOwnId?'hidden':'block'}`}>
           <button onClick={()=>{
            setdisplay(true)
           }}  className={`w-[12rem] ${isFriend?'block':"hidden"} bg-green-500 text-white  py-1 text-lg font-semibold`}>
             Friends
            </button>
           <button onClick={cancelRequest} className={`w-[12rem] ${isRequested && !isFriend?'block':"hidden"} bg-gray-900 text-white  py-1 text-lg font-semibold`}>
           {Loading?'Loading':'Cancel Request'}
            </button>
           <button onClick={sendRequest} className={`w-[12rem] ${!isFriend && !isRequested && !isRequestReceived?'block':"hidden"} bg-orange-700 text-white  py-1 text-lg font-semibold`}>
               {Loading?'Loading':' Add Friend'}
            </button>
           </div>
            <button 
            onClick={()=>{
                navigate('/friends')
            }}
             className={`w-[12rem] ${!isRequestReceived?'hidden':'block'}  text-white bg-gray-950 py-1 text-lg font-semibold`}>
               Request Received
            </button>
            <button 
             className={`w-[12rem] ${!isOwnId?'hidden':'block'}  text-white bg-gray-950 py-1 text-lg font-semibold`}>
                Your Profile
            </button>


           <div className='flex flex-row gap-2'>
           <button onClick={()=>{
            usefullData.setPhotos(true)
            usefullData.setPosts(false)
           }} className={`text-md bg-black ${usefullData.Photo?'bg-opacity-45':"bg-opacity-15"}  py-1 w-[6rem] rounded-md`}>
                Photos
            </button>
            <button onClick={()=>{
                usefullData.setPhotos(false)
                usefullData.setPosts(true)
            }} className={`text-md bg-black ${usefullData.Post?'bg-opacity-45':"bg-opacity-15"}  py-1 w-[6rem] rounded-md`}>
                Posts
            </button>

           </div>
        </div>
    </div>
    <div>
    <div>
            <h1 className='text-md font-bold'>
                Friends ({user?user?.friends?.length:''}) :-
            </h1>
            <div className='flex flex-wrap justify-center items-center gap-1 min-h-24 text-xl'>
                {
                   user?.friends?.length==0?"Dont Have Friends !": user?.friends?.map((itm,idx)=>{
                        return (
                            <div key={idx}>
                               <img onClick={()=>{
                                navigate(`/profile/${itm._id}`)
                               }} src={itm?.profile} alt="PP" className='h-20 w-20 cursor-pointer transition-all duration-300 hover:scale-110 object-cover  rounded-full' />
                                <div className='text-center text-xs'>
                                    {itm?.name}
                                </div>
                            </div>
                        )
                    })
                }
                <div>
              
                </div>
            </div>
        </div>
        <div>
            <h1 className='text-md font-bold'>
                Groups ({user?user?.groups?.length:''}) :-
            </h1>
            <div className='flex flex-wrap justify-center items-center gap-1 min-h-24 text-xl'>
                {
                    user.groups?.length==0?"Not Associated In Any Group!": user?.groups?.map((itm,idx)=>{
                        return (
                            <div  key={idx}>
                                <img onClick={()=>{
                                    navigate(`/group/visit/${itm._id}`)
                                }} src={itm?.Profile} alt='Profile' className='h-20 w-20 object-cover cursor-pointer hover:scale-110 transition-all duration-300 bg-black rounded-full'/>

                                <div className='text-center text-xs'>
                                    {itm?.Name}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    </div>
    <div>
    
  </div>
  <Notify acceptFun={handleUnfriend} display={display} setDisplay={setdisplay} Title={'Do You Want to Unfriend?'} data={`If you want to unfriend ${user.name} click accept or you can cancel the process`}/>
</div>

  )
}

export default PersonalInfo