import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import { useNavigate } from "react-router-dom";
import CreateGroup from "./CreateGroup";
import fetcher from "../Utils/axios";
import { UseCreatedContext } from "../Context/UserContext";

const Groups = () => {
  const [groups, setGroups] = useState([]);
  const [groupToSearch, setgroupToSearch] = useState([]);
  const [Display, setDisplay] = useState(false)
  const [Trigger, setTrigger] = useState(true)

  const navigate = useNavigate()

  const {User} = UseCreatedContext()

  useEffect(() => {
    fetcher.get('/group/all')
    .then(res=>{
      const data = res.data.data.groups
      setGroups(data)
      setgroupToSearch(data)
    })
    .catch(err=>{
      console.log(err)
    })
  }, [Trigger])
  
const handleTextChange = (e)=>{
  let searchTerm = e.target.value
  let newList = groupToSearch.filter(itm=>itm.Name.toLowerCase().includes(searchTerm))
  setGroups(newList)
}
  return (
    <Layout>
      <div className="bg-gradient-to-r relative  p-6">
        {/* Header Section */}
        <div className="sticky top-0 left-0 right-0 bg-white shadow-md px-6 py-4 rounded-md z-10">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold text-gray-800">Groups</h2>
            <button onClick={()=>{
              setDisplay(true)
            }} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md shadow-md">
              + Create
            </button>
          </div>
          {/* Search Bar */}
          <div className="mt-4">
            <input
              type="text"
              onChange={handleTextChange}
              placeholder="Search Groups..."
              className="w-full bg-gray-100 rounded-md shadow-md px-4 py-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Groups List Section */}
        <div className="mt-6 flex flex-col gap-6">
          {groups.length === 0 ? (
            <div className="text-center text-xl font-semibold text-gray-400 py-20 bg-white rounded-md shadow-md">
              No Groups Found
            </div>
          ) : (
            groups.map((group, idx) => (
              <div
                onClick={()=>{
                  navigate(`/group/visit/${group._id}`)
                }}
                key={idx}
                className="flex items-center justify-between cursor-pointer bg-white p-4 rounded-md shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={group.Profile}
                    alt={group.Name}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-800 text-lg">
                      {group.Name} {User._id===group.CreatedBy._id?<b title="Your Group">🟢</b>:''}
                    </h3>
                    <p className="text-gray-500 text-sm">
                      {group.Members.length} Members , Created-By: <b className="hover:text-gray-800" onClick={(e)=>{
                        e.stopPropagation()
                        navigate(`/profile/${group.CreatedBy._id}`)
                      }}>
                          {
                            group.CreatedBy.name
                          }
                      </b>
                    </p>
                  </div>
                </div>
                
              </div>
            ))
          )}
        </div>      
      </div>
      <CreateGroup trigger={{Trigger, setTrigger}} display={{Display, setDisplay}}/>
    </Layout>
  );
};

export default Groups;
