import React, { useState, useEffect } from "react";
import Layout from "../Layout/Layout";
import { useNavigate } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
import { useChat } from "../Context/ChatContext";
import LoadingScreen from "../Components/LoadingScreen";

const Messages = () => {
  const navigate = useNavigate();
  const { Loading, Friends,Messages } = useChat();

  const [searchText, setSearchText] = useState("");
  const [SearchedFriends, setSearchedFriends] = useState([]);


  // Search Logic: Filters friends dynamically as the user types
  useEffect(() => {
    if (searchText.trim() === "") {
      setSearchedFriends([]);
    } else {
      const filteredFriends = Friends.filter((friend) =>
        friend.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setSearchedFriends(filteredFriends);
    }
  }, [searchText, Friends]);

  if (Loading)
    return (
      <Layout>
        <LoadingScreen />
      </Layout>
    );

  return (
    <Layout>
      <div className="md:px-8 pt-6 relative bg-gray-50 min-h-screen">
        {/* Header Section */}
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-700">Messages</h1>
          <div className="relative w-[14rem] md:w-[18rem]">
            <input
              type="text"
              placeholder="Search Friends..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="h-12 w-full px-4 pr-10 text-sm text-gray-700 placeholder-gray-400 bg-white border border-gray-300 rounded-lg shadow-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
            <RxCross1
              onClick={() => setSearchText("")}
              className={`absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400 hover:text-red-500 ${
                searchText ? "block" : "hidden"
              }`}
            />
          </div>
        </div>

        {/* Chats Section */}
        <div className="flex flex-col-reverse gap-2">
          {Messages?.length <=0 ? (
            <div className="flex  justify-center items-center h-40 text-xl font-medium text-gray-400">
              No Chats Found!
            </div>
          ) : (
            Messages.map((chat) => (
              <div
                onClick={() => navigate(`/messages/chat/${chat?.chatsWith?._id}`)}
                key={chat._id}
                className="flex items-center gap-4 p-4 border rounded-lg shadow-md bg-white hover:shadow-lg hover:bg-gray-50 cursor-pointer transition-all"
              >
                <img
                  src={chat?.chatsWith?.profile}
                  alt={`${chat.name}'s profile`}
                  className="h-14 w-14 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {chat?.chatsWith?.name}
                  </h2>
                  <p className="text-gray-500 text-sm truncate">
                    {chat.lastText}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Friend Suggestions */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Friend Suggestions
          </h2>
          <div className="space-y-6">
            {Friends?.length === 0 ? (
              <div className="flex justify-center items-center h-40 text-xl font-medium text-gray-400">
                No Friends Found!
              </div>
            ) : (
              Friends.map((friend) => (
                <div
                  onClick={() => navigate(`/messages/chat/${friend._id}`)}
                  key={friend._id}
                  className="flex items-center gap-4 p-4 border rounded-lg shadow-md bg-white hover:shadow-lg hover:bg-gray-50 cursor-pointer transition-all"
                >
                  <img
                    src={friend.profile}
                    alt={`${friend.name}'s profile`}
                    className="h-14 w-14 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold text-gray-800">
                      {friend.name}
                    </h2>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Search Results */}
        {searchText && (
          <div className="absolute z-50 top-20 left-1/2 transform -translate-x-1/2 w-full md:w-3/5 bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">
                Search Results
              </h3>
              <button
                onClick={() => setSearchText("")}
                className="text-gray-500 hover:text-red-500"
              >
                <RxCross1 className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4 overflow-y-auto max-h-[60vh]">
              {SearchedFriends.length === 0 ? (
                <div className="flex justify-center items-center h-32 text-lg font-medium text-gray-400">
                  No Results Found
                </div>
              ) : (
                SearchedFriends.map((friend) => (
                  <div
                    onClick={() => navigate(`/messages/chat/${friend._id}`)}
                    key={friend._id}
                    className="flex items-center gap-4 p-4 border rounded-lg shadow-md bg-gray-100 hover:shadow-lg hover:bg-gray-50 cursor-pointer transition-all"
                  >
                    <img
                      src={friend.profile}
                      alt={`${friend.name}'s profile`}
                      className="h-14 w-14 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h2 className="text-lg font-semibold text-gray-800">
                        {friend.name}
                      </h2>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Messages;
