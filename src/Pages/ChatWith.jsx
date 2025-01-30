import React, { useEffect } from 'react'
import Layout from '../Layout/Layout'
import ChatHeader from '../Components/ChatHeader'
import ShowChatsComponent from '../Components/ShowChatsComponent'
import MessageInput from '../Components/MessageInput'
import { useParams } from 'react-router-dom'
import { useChat } from '../Context/ChatContext'
import LoadingScreen from '../Components/LoadingScreen'

const ChatWith = () => {
  const {id} = useParams()

  const {setActiveUserId,Loading} = useChat()

  useEffect(()=>{
    if(id){
      setActiveUserId(id)
    }
  },[id])
  if(Loading) return <Layout> <LoadingScreen/> </Layout>
  return (
   <Layout>
    <ChatHeader/>
    <div className='pt-16 overflow-auto h-full'>
    <ShowChatsComponent/>
    </div>
    <MessageInput/>
   </Layout>
  )
}

export default ChatWith