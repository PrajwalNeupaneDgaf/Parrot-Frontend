import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import fetcher from "../Utils/axios";
import SentRequest from "../Components/SentRequest";
import ReceivedRequest from "../Components/ReceivedRequest";
import ShowFriends from "../Components/ShowFriends";

const Friends = () => {
  const [ChangeMode, setChangeMode] = useState(false);
  const [Received, setReceived] = useState([])
  const [Sent, setSent] = useState([])
  const [data, setData] = useState({});
  const [Trigger, setTrigger] = useState(true)

  useEffect(() => {
    fetcher
      .get("friend/getall")
      .then((res) => {
        let Data = res.data;
        setData(Data);
        setSent(Data.sentFriendRequests)
        setReceived(Data.friendRequests)
      })
      .catch((err) => {
        console.log(err);
      });
  }, [Trigger]);
  return (
    <Layout>
      <div>
        <div className="text-xl md:text-2xl font-semibold px-3">
          Friend Requests
        </div>
        <div className="flex gap-3 flex-row pt-3 px-3">
          <button
            onClick={() => {
              setChangeMode(false);
            }}
            className={`w-32 py-2 bg-black ${
              ChangeMode ? "bg-opacity-35" : "bg-opacity-90 text-white"
            } rounded-md`}
          >
            Received
          </button>
          <button
            onClick={() => {
              setChangeMode(true);
            }}
            className={`w-32 py-2 bg-black ${
              !ChangeMode ? "bg-opacity-35" : "bg-opacity-90 text-white"
            } rounded-md`}
          >
            Sent
          </button>
        </div>
        <div className="pt-3 px-3 flex flex-col gap-3 justify-center items-center">
          {ChangeMode ? (
            <SentRequest setTrigger={setTrigger} data={Sent} setData={setSent}/>
          ) : (
            <ReceivedRequest setTrigger={setTrigger} data={Received} setData={setSent}/>
          )}
        </div>
      </div>
      <div>
        <div className="md:text-2xl text-xl font-semibold px-3 py-3">
          Friends
        </div>
          <ShowFriends setTrigger={setTrigger} data={data.friends}/>
      </div>
    </Layout>
  );
};

export default Friends;
