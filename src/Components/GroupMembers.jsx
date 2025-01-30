import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UseCreatedContext } from "../Context/UserContext";
import fetcher from "../Utils/axios";
import toastr from "toastr";

const GroupMembers = ({ data ,trigger}) => {

    const navigate = useNavigate()

    const {User} = UseCreatedContext()

    const {id} = useParams()

    const KickUser = (userId)=>{
        fetcher.put(`group/remove-user/${id}/${userId}`)
        .then(res=>{
            toastr.success('Kicked')
            trigger.setTrigger(!trigger.trigger)
        }).catch(err=>{
            toastr.error(err.response.data.message||'Error')
        })
    }

  
  return (
    <div>
      <div>
        <b className="text-xl text-gray-800">Members</b>
      </div>
      <div className="overflow-auto">
        {data ? (
          <div className="flex flex-col gap-2">
            {
                data?.map(itm=>{
                    return(
                        <div key={itm?._id} className="py-1 px-2 gap-2 flex items-center justify-between bg-gray-300 rounded">
                           <div className="flex flex-row gap-2 items-center">
                           <div>
                                <img onClick={()=>{
                                    navigate(`/profile/${itm?._id}`)
                                }} src={itm?.profile} alt="error" className="h-12 w-12 object-cover rounded-full cursor-pointer transition-all duration-300 hover:scale-110" />
                            </div>
                            <b>
                                {itm?.name}
                            </b>
                           </div>
                            <div> 
                                <button onClick={()=>{
                                    KickUser(itm?._id)
                                }} className={`${itm._id==User._id?'hidden':''} rounded px-3 py-1 bg-red-500 text-white font-semibold hover:bg-red-700`}>Kick</button>
                            </div>
                        </div>
                    )
                })
            }
          </div>
        ) : (
          <div className="text-2xl text-center py-4 text-gray-400">
            {" "}
            NO REQUESTS !
          </div>
        )}
      </div>
    </div>
  );
};

export default GroupMembers;
