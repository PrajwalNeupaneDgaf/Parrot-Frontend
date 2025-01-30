import React, { useEffect } from 'react'
import Navbar from '../Pages/Navbar'
import { UseCreatedContext } from '../Context/UserContext'
import { useNavigate } from 'react-router-dom'

const Layout = ({children}) => {
    const { isLoggedIn, isVerified} = UseCreatedContext()

    const navigate = useNavigate()

    useEffect(()=>{
       if(!isLoggedIn){
            navigate('/login')
        }
        if(!isVerified){
            navigate('/verify-your-email')
        }
    },[])
  return (
    <div>
        <Navbar/>
        <div className='lg:pt-16 pt-24 noScrollBar'>
            {children}
        </div>
    </div>
  )
}

export default Layout