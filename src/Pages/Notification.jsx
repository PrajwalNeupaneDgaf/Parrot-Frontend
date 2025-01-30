import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import { useNavigate } from "react-router-dom";
import fetcher from "../Utils/axios";
import LoadingScreen from "../Components/LoadingScreen";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [Loading , setLoading] = useState(true)
  const [Trigger , setTrigger] = useState(true)

  const navigate = useNavigate()

  const markAllAsRead = () => {
   fetcher.put('/notification/markallasread')
   .then(()=>{
    setTrigger(!Trigger)
   }).catch()

  };

  useEffect(()=>{
    fetcher.get('/getnotifications')
    .then(res=>{
      const data = res.data.notifications || []
      setNotifications(data)
    })
    .catch(err=>{
      navigate(-1)
    }).finally(()=>{
      setLoading(false)
    })
  },[Trigger])

  if(Loading){
    return <LoadingScreen/>
  }

  return (
    <Layout>
      <div className="p-4 md:p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Notifications</h1>
          <button
            onClick={markAllAsRead}
            className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Mark All as Read
          </button>
        </div>
        <div className="flex flex-col-reverse gap-2">
          {notifications?.map((notification) => (
            <div onClick={()=>{
              navigate(notification?.Link)
            }}
              key={notification?._id}
              className={`p-4 border rounded-md shadow-md cursor-pointer ${
                !notification.IsRead ? "bg-gray-200" : "bg-white"
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className=" flex flex-row gap-2 items-center relative">
                    <img onClick={(e)=>{
                      e.stopPropagation()
                      navigate(`/profile/${notification?.By?._id}`)
                    }} src={notification?.By?.profile} alt="error" className="h-9 w-9 cursor-pointer rounded-full object-cover"/>
                    <h2 className="text-lg font-semibold">{notification.Title}</h2>
                  </div>
                  <p className="text-gray-600">{notification.Description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Notifications;
