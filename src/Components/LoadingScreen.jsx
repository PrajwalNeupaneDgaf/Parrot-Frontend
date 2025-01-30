import React from 'react'

const LoadingScreen = () => {
  return (
    <div className='h-[100vh] w-[100vw] flex justify-center items-center'>
        <div className='flex gap-6'>
            <div className="dots"></div>
            <div className="dots"></div>
            <div className="dots"></div>
            <div className="dots"></div>
            <div className="dots"></div>
            <div className="dots"></div>
        </div>
    </div>
  )
}

export default LoadingScreen