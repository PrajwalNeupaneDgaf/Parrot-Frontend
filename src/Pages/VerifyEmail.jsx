import React, { useEffect, useState } from 'react'
import { UseCreatedContext } from '../Context/UserContext'
import { useNavigate } from 'react-router-dom'
import fetcher from '../Utils/axios';
import toastr from 'toastr'

const VerifyEmail = () => {
    const { isLoggedIn, isVerified, setIsLoggedIn } = UseCreatedContext(); 
    
    const navigate = useNavigate();

    useEffect(() => {
     
        if (!isLoggedIn) {
            navigate('/login');
            return;
        } else if (isVerified) {
            navigate('/');
        }
    }, [isLoggedIn, isVerified, navigate]);  

    const [isAccepted, setisAccepted] = useState(false)
    const [isRejected, setisRejected] = useState(false)

    const Accept = async ()=>{
        if(isAccepted || isRejected){
            return
        }
        setisAccepted(true)
       try {
            const data = await fetcher.post('user/sendemail')
            toastr.success('Succesfully Sent You Email Check')
       } catch (error) {
            toastr.error('Something Went Wrong')
            console.log(error)
            setisAccepted(false)
       }

    }

    const Reject = async ()=>{
        if(isAccepted || isRejected){
            return
        }
        setisRejected(true)
        try {
            const data = await fetcher.delete('user/deleteaccount')
            setIsLoggedIn(false)
            navigate('/login')
        } catch (error) {
            
            console.log(error)
        }
    }

    return (
        <div className=' w-[100vw] h-[100vh] flex justify-center items-center'>
            <div className='p-4 bg-gray-300 rounded-lg w-[95%] md:w-[35rem]'>
                <div className='font-bold text-3xl text-center font-sans py-2'>
                    <h1>
                        VERIFICATION
                    </h1>
                </div>
                <div className='md:text-md text-sm text-justify'>
                    Hey! User we May ask permission to send email. If you accept we will Send Email on Your Gmail to verify it's you. Or you may Cancel the process that Cancel all your signup process
                </div>
                <div className={`text-center font-lg font-semibold ${isAccepted?'block':'hidden'}`}>
                    We Have sent You a email You Can check your gmail exp:5min
                </div>
                <div className='flex flex-row gap-2 py-2'>
                    <button onClick={Accept} className='w-[50%] p-2 bg-green-500 text-white font-semibold'>
                        Accept
                    </button>
                    <button onClick={Reject} className='w-[50%] p-2 text-red-700 font-semibold bg-black'>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default VerifyEmail;
