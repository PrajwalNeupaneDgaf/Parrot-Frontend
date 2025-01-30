import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const FullPhoto = () => {
    const {version,id,data} = useParams()
    const navigate = useNavigate()
  return (
    <div className='bg-black w-[100vw] h-[100vh] relative'>
        <div className='absolute top-0 left-0 right-0 flex justify-between  text-orange-500 py-2 px-2'>
            <button className='font-extrabold text-4xl  px-4 rounded' onClick={()=>{
                navigate(-1)
            }}>
               ←
            </button>

        </div>
        <img src={`https://res.cloudinary.com/dlpowhk0e/image/upload/${version}/${data}/${id}`} alt=""  className='h-[100vh] w-[100vw] object-contain'/>
    </div>
  )
}

export default FullPhoto