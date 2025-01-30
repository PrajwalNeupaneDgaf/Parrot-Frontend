import React from "react";
import { useNavigate } from "react-router-dom";

const Photos = ({ profiles }) => {
  const navigate = useNavigate()
  const handleClick = (link) =>{
    const data = link.split('/')
    let version = data[6]
    let id = data[7]
    let file = data[8]

    navigate(`/image/${version}/${id}/${file}`)
  }
  return (
    <div className=" pb-8">
      <div className="text-xl font-semibold text-gray-700 px-4 py-2">Profile Pictures</div>
      <div className="flex justify-right gap-2 items-center flex-wrap lg:px-3 px-6">
        {profiles.map((itm, idx) => {
          return (
            <div key={idx} onClick={()=>{
              handleClick(itm)
            }} className="h-fit w-fit bg-transparent shadow-lg">
              <img
                src={itm}
                alt="ERROR"
                className="h-32 md:h-56 object-contain rounded-xl"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Photos;
