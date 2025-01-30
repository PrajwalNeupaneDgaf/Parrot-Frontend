import React, { createContext, useContext, useEffect, useState } from 'react';
import LoadingScreen from '../Components/LoadingScreen';
import fetcher from '../Utils/axios';
import toastr from 'toastr';

import { io } from 'socket.io-client'

const ContextCreator = createContext();

const UserContext = ({ children }) => {
    // State initialization with proper default values
    const [Loading, setLoading] = useState(true);
    const [User, setUser] = useState({});  // Assuming name and email as properties
    const [isAuthorized, setisAuthorized] = useState();
    const [isVerified, setIsVerified] = useState();
    const [isLoggedIn, setIsLoggedIn] = useState();  
    const [Socket ,setSocket] = useState(null)

    
    useEffect(() => {
            fetcher.get('user/getmydata')
            .then(res=>{
                let data = res.data.data
                setIsLoggedIn(true)
                setIsVerified(data.isVerified)
                setUser(data)
            }).catch ((error) =>{
                setIsLoggedIn(false)
                setIsVerified(false)
                setisAuthorized(false)
            console.log(error)
        }).finally(()=>{
            setLoading(false)
        })
    }, [isLoggedIn,isVerified]);


    useEffect(()=>{
        const socket = io("https://parrot-backend-si0b.onrender.com",{
          query:{
            id:User?._id
          }
        })
    
        setSocket(socket)
    
        return ()=>socket.close()
      },[User])

      useEffect(()=>{
        if(Socket){
            Socket?.on('requestReceived',(data)=>{
                toastr.info(`${data.username} sent you Request` )
            }) 
        }

        return ()=> Socket?.off('requestReceived')
      },[Socket])
    
    if (Loading) {
        return <LoadingScreen />;
    }
    

    return (
        <ContextCreator.Provider
            value={{
                User, setUser,
                isAuthorized, setisAuthorized,
                isVerified, setIsVerified,
                isLoggedIn, setIsLoggedIn,
                Socket ,setSocket,
               
            }}
        >
            {children}  {/* Children components will have access to the context */}
        </ContextCreator.Provider>
    );
};

export default UserContext;

// Custom hook to use context
export const UseCreatedContext = () => {
    const context = useContext(ContextCreator);

    if (!context) {
        throw new Error('useCreatedContext must be used within a UserProvider');
    }

    return context;
};
