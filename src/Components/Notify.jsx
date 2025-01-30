import React from 'react'

const Notify = ({Title,data,acceptFun,display , setDisplay}) => {

  return (
   <div className={`fixed top-0 left-0 right-0 bottom-0 z-50 justify-center items-center ${display?'flex':'hidden'} backdrop-blur-md`}>
            <div className='p-5 bg-black bg-opacity-35 rounded-lg md:w-96 w-[90%]'>
                    <h1 className='text-center font-bold text-3xl pb-3'>
                        {Title}
                    </h1>
                    <p className='text-lg pb-3 '>
                        {data}
                    </p>
                    <div className='w-full flex justify-end px-3 gap-3'>
                            <button 
                            onClick={()=>{
                                setDisplay(false)
                            }}
                            className='px-4 py-2 bg-black text-white rounded-md'>
                                Cancel
                            </button>
                            <button 
                            onClick={()=>{
                                acceptFun()
                                setDisplay(false)
                            }}
                            className='px-4 py-2 bg-blue-700 text-white rounded-md'>
                                Accept
                            </button>
                    </div>
            </div>
   </div>
  )
}

export default Notify