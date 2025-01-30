import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import GroupTop from "../Components/GroupTop";
import CreatePost from "../Components/CreatePost";
import LoadingScreen from "../Components/LoadingScreen";
import fetcher from "../Utils/axios";
import { useParams } from "react-router-dom";
import { UseCreatedContext } from "../Context/UserContext";
import Posts from "../Components/Posts";
import PopOver from "../Components/PopOver";
import UpdateGroup from "../Components/UpdateGroup";
import GroupMember from "../Components/GroupMember";

const GroupProfile = () => {
  const [isMember, setisMember] = useState();
  const [groupData , setGroupData] = useState({})
  const [Loading, setLoading] = useState(true)
  const [trigger , setTrigger] = useState(true)
  const [isEditMode, setisEditMode] = useState(false)
  const [isRequestMode, setisRequestMode] = useState(false)
  const [isRequested , setIsRequested] = useState(false)

const {id} = useParams()

const {User} = UseCreatedContext()

  useEffect(()=>{
    fetcher.get(`group/data/${id}`)
    .then(res=>{
      const data = res.data
      setGroupData(data?.data)
      setisMember(data?.isMember)
      setIsRequested(data?.isRequested)
    }).catch(err=>{
      console.log(err)
    }).finally(setLoading(false))
  },[trigger])

  if(Loading){
    return <Layout><LoadingScreen/></Layout>
  }
  return (
    <Layout>
      <div className="bg-gray-200 pb-12">
        <GroupTop request={{isRequested , setIsRequested}} setIsMember={setisMember} setisEditMode={setisEditMode} setisRequestMode={setisRequestMode} isMember={isMember} data={groupData} isCreator={groupData.CreatedBy===User._id}/>
        <div className={`pt-3 pb-3`}>
        {
          isMember?  <CreatePost GroupId={groupData._id}/>:<div className="text-center font-semibold"> Join group For other Feature !!! </div>
        }
        </div>
        <Posts Posts={groupData.Posts}/>
      </div>
      <PopOver isDisplay={isEditMode} setIsDisplay={setisEditMode} Title={'Group Manager'}>
        <UpdateGroup setisEditMode={setisEditMode}/>
      </PopOver>
      <PopOver isDisplay={isRequestMode} setIsDisplay={setisRequestMode} Title={'Group Request'}>
        <GroupMember trigger={{trigger , setTrigger}} data={groupData} setisRequestMode={setisRequestMode}/>
      </PopOver>
    </Layout>
  );
};

export default GroupProfile;
