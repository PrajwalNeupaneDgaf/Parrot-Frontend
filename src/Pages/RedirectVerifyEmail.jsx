import React, { useEffect, useState } from 'react'
import { UseCreatedContext } from '../Context/UserContext'
import { useNavigate, useParams } from 'react-router-dom'
import LoadingScreen from '../Components/LoadingScreen';
import fetcher from '../Utils/axios';

const RedirectVerifyEmail = () => {
    const { isLoggedIn, isVerified, setIsVerified } = UseCreatedContext(); 
    
    const navigate = useNavigate();

    useEffect(() => {
        
        if (!isLoggedIn) {
            navigate('/login');
            return;
        } else if (isVerified) {
            navigate('/');
        }
    }, [isLoggedIn, isVerified, navigate]); 


    const {token} = useParams()

    useEffect(()=>{
        fetcher.post(`user/verify/${token}`)
        .then((res)=>{
            setIsVerified(true)
            navigate('/')
        }).catch(err=>{
            toastr.error('Sorry Try Again With Next Link')
            navigate('/verify-your-email')
        })
        console.log(token)
    },[])
   

    return (
       <LoadingScreen/>
    );
}



export default RedirectVerifyEmail