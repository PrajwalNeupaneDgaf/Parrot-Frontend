import React from 'react'
import { useNavigate } from 'react-router-dom'

const SearchResultPeople = ({people}) => {
    const navigate = useNavigate()
  return (
    <div>
         {
          people.length==0? <div className='w-full mt-12 flex justify-center items-center text-3xl scale-y-150 font-semibold'>
            NO USERS FOUND !
          </div>: 
          <div className='flex flex-col gap-2 px-3 py-4'>
            {
                people?.map(itm=>{
                    return (
                        <div key={itm._id}
                        className='bg-gray-200 py-3 px-4 rounded-md cursor-pointer [w-90%] flex items-center gap-3'
                        onClick={()=>{
                            navigate(`/profile/${itm._id}`)
                        }}
                        >
                            <img src={itm.profile} alt="Profile" className=' rounded-full w-12 object-cover h-12' />
                          <b>
                          {
                            itm.name
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

export default SearchResultPeople