import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import { useNavigate, useParams } from "react-router-dom";
import fetcher from "../Utils/axios";
import Post from "../Components/Post";
import LoadingScreen from "../Components/LoadingScreen";
import { RxCross1 } from "react-icons/rx";
import Comment from "../Components/Comment";

const DetailedPost = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const [Posts, setPost] = useState({});
  const [Comments, setComments] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [ViewLikes, setViewLikes] = useState(false)
  const [Trigger, setTrigger] = useState(true)

  useEffect(() => {
    fetcher
      .get(`/post/details/${id}`)
      .then((res) => {
        const data = res.data;
        setPost(data);
        setComments(data.Comments)
        // console.log(data);
      })
      .catch((err) => {
        navigate(-1);
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [Trigger]);


  if (Loading) {
    return <LoadingScreen />;
  }
  return (
    <Layout>
      {Posts ? <Post setTrigger={setTrigger} itm={Posts} /> : ""}

      {/* Add a comment  */}

      <div className="py-4 px-3 text-xl flex justify-between items-center gap-2  text-gray-500">
        <b>Comments ({Comments?Comments.length:''})  </b >

        <button onClick={()=>{
          setViewLikes(true)
        }} className="bg-green-200 px-2 py-1 rounded">
          View Likes
        </button>
      </div>

      <div className="px-2 md:px-4 flex flex-col gap-2 pb-6">
       {
        Comments?.map((itm)=>{
          return <Comment setTrigger={setTrigger} key={itm?._id} data={itm} postId={id}/>
        })
       }
      </div>

      <div onClick={()=>{
        setViewLikes(false)
      }}  className={`fixed ${ViewLikes?'flex':'hidden'} overflow-auto noScrollBar top-0 left-0 right-0 bottom-0 z-50 bg-black bg-opacity-25 pt-[10vh] justify-center`}>
        <div onClick={(e)=>{
          e.stopPropagation()
        }} className="min-h-96 overflow-auto noScroller bg-white w-[100%] md:w-[45rem] rounded">
          <div className="text-lg text-gray-700 py-4 px-5 flex justify-between items-center">
            <b>
              Liked By
            </b>
            <button onClick={(e)=>{
              e.stopPropagation()
              setViewLikes(false)
            }} title="Close" className="hover:text-red-500">
            <RxCross1 />
            </button>
          </div>
          <div className="flex flex-col gap-2 px-4 ">
            {
              Posts?.LikedBy?.map(itm=>{
                return (
                  <div onClick={(e)=>{
                    e.stopPropagation()
                    navigate(`/profile/${itm._id}`)

                  }} key={itm._id} className=" cursor-pointer flex flex-row gap-2 items-center bg-gray-400 p-1 rounded-lg">
                    <img src={itm?.profile} alt="Error" className="bg-black h-10 w-10 object-cover rounded-full" />
                    <b>
                      {itm?.name}
                    </b>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DetailedPost;
