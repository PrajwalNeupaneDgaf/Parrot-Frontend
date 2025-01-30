import React from 'react'
import { useNavigate } from 'react-router-dom'

const SearchResultGroups = ({groups}) => {
    const navigate = useNavigate()
  return (
    <div>
         {
          groups.length==0? <div className=' w-full flex justify-center items-center text-3xl mt-12 scale-y-150 font-semibold'>
            NO GROUPS FOUND !
          </div>: 
         <div className='flex flex-col gap-2 px-3 py-4'>
         {
             groups?.map(itm=>{
                 return (
                     <div key={itm._id}
                     className='bg-gray-200 py-3 px-4 rounded-md cursor-pointer [w-90%] flex items-center gap-3'
                     onClick={()=>{
                        navigate(`/group/visit/${itm._id}`)
                    }}
                     >
                         <img src={itm.Profile} alt="Profile" className=' rounded-full w-12 object-cover h-12' />
                       <b>
                       {
                         itm.Name
                        }
                       </b>
                     </div>
                 )
             })
         }
       </div>
        }
    </div>
  )
}

export default SearchResultGroups