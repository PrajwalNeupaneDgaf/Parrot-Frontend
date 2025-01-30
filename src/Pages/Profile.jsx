import React, { useEffect, useState } from 'react'
import Layout from '../Layout/Layout'
import { useParams } from 'react-router-dom'
import { UseCreatedContext } from '../Context/UserContext'
import PersonalInfo from '../Components/PersonalInfo'
import fetcher from '../Utils/axios'
import LoadingScreen from '../Components/LoadingScreen'
import CreatePost from '../Components/CreatePost'
import Photos from '../Components/Photos'
import Posts from '../Components/Posts'

const Profile = () => {
  const {id} = useParams()
  const [isLoading , setIsLoading] = useState(true)
  const [isOwnId , setIsOwnId] = useState(false)
  const [isFriend,setIsFriend] = useState(false)
  const [isRequested, setIsRequested] = useState(false)
  const [isRequestReceived, setisRequestReceived] = useState(false)
  const [user,setUser] = useState({})
  const [Photo, setPhotos] = useState(false)
  const [Post, setPosts] = useState(true)
  const [Trigger, setTrigger] = useState(true)

  const {User} = UseCreatedContext()

  useEffect(()=>{
    fetcher.get(`profile/data/${id}`)
      .then(res=>{
        const data = res.data
        setUser(data.User)
        setIsOwnId(data.isOwnId)
        setIsFriend(data.isFriend)
        setIsRequested(data.isRequested)
        if(!data.isOwnId){
          if(data.User.sentFriendRequests?.includes(User._id)){
          setisRequestReceived(true)
          }
        }
      })
      .catch(err=>{
        console.log(err)
      }).finally(()=>{
        setIsLoading(false)
      })
  },[id ,Trigger])

  if(isLoading){
    return <LoadingScreen/>
  }
  return (
  <Layout>
    <PersonalInfo setIsFriend={setTrigger} isRequestReceived={isRequestReceived} user={user} isRequested={isRequested} setIsRequested={setIsRequested} isOwnId={isOwnId} isFriend={isFriend} usefullData={{Photo, setPhotos,Post, setPosts}}/>
    {
      isOwnId?<CreatePost/>:""
    }
    {
      Photo?<Photos profiles={user.profilePictures}/>:<Posts isOwnPost={isOwnId} Posts={user.posts}/>
    }
  </Layout>
  )
}

export default Profile