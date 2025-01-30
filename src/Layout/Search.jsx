import React, { useEffect, useState } from 'react'
import Layout from './Layout'
import { useParams } from 'react-router-dom'
import fetcher from '../Utils/axios'
import LoadingScreen from '../Components/LoadingScreen'
import SearchResultPeople from '../Components/SearchResultPeople'
import SearchResultGroups from '../Components/SearchResultGroups'

const Search = () => {
  const {query} = useParams()
  const [Loading, setLoading] = useState(true)
  const [isGroup,setisGroup] = useState(false)
  const [people, setpeople] = useState([])
  const [groups, setgroups] = useState([])

  useEffect(()=>{
    fetcher.get(`search/${query}`)
    .then(res=>{
      const data = res.data
      setpeople(data?.people)
      setgroups(data?.groups)
    }).catch((err)=>{
      console.log(err)
    }).finally(()=>{
      setLoading(false)
    })
  },[query])

  if(Loading){
    return <>
    <Layout>
      <LoadingScreen/>  
    </Layout>    
    </>
  }
  return (
    <Layout>
        <div className='pt-2 px-3 text-xl font-bold md:text-2xl'>
          Search Results:
        </div>
        <div className='px-3 flex justify-start gap-4 pt-3'>
            <button onClick={()=>{
              setisGroup(false)
            }} className={`font-semibold bg-black rounded-lg py-2 px-6 ${!isGroup?'bg-opacity-60 text-white':'bg-opacity-20'}`}>People</button>
            <button  onClick={()=>{
              setisGroup(true)
            }} className={`font-semibold bg-black rounded-lg py-2 px-6 ${isGroup?'bg-opacity-60 text-white':'bg-opacity-20'}`}>Groups</button>
        </div>
       {
        isGroup?<SearchResultGroups groups={groups}/>:<SearchResultPeople people={people}/>
       }
    </Layout>
  )
}

export default Search