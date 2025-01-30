import React, { useState, useRef, useEffect } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { MdSend } from "react-icons/md";
import { format } from "date-fns"; // Importing date-fns for formatting dates
import { UseCreatedContext } from "../Context/UserContext";
import { useChat } from "../Context/ChatContext";
import toastr from "toastr";


const ShowChatsComponent = () => {

  const chatEndRef = useRef(null); // Create a ref to track the chat container's bottom

  const { User } = UseCreatedContext();
  const {ActiveChats , setisEditingMode,setMessage,seteditingMessage} = useChat();


  // Function to scroll to the bottom
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll to bottom on component mount and whenever chats change
  useEffect(() => {
    scrollToBottom();
  }, [ActiveChats]);

  return (
    <div className="flex flex-col min-h-[65vh] bg-gray-100">
      {/* Messages */}
      <div className="flex-1 overflow-auto noScrollBar p-4 space-y-4">
        {ActiveChats?.map((chat, idx) => (
          <div
            onDoubleClick={()=>{
              if(chat.Sender._id===User._id || chat.Sender == User?._id){
                seteditingMessage(chat.Message)
                setisEditingMode(true)
                setMessage(chat)
                toastr.info('editing')
              }
            }}
            key={idx}
            className={`flex items-end ${
              chat.Sender._id ==User._id || chat.Sender == User._id? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`flex flex-col ${
                chat.Sender._id ==User._id || chat.Sender == User._id ? "items-end" : "items-start"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-lg shadow-md text-sm ${
                  chat.Sender._id ==User._id || chat.Sender == User._id
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {chat.Message}
              </div>
              <span className="text-xs text-gray-500 mt-1">
                {format(new Date(chat.createdAt), "p, MMM d, yyyy")}
              </span>
            </div>
          </div>
        ))}
        {/* Empty div to mark the bottom of the chat container */}
        <div ref={chatEndRef}></div>
      </div>

    </div>
  );
};

export default ShowChatsComponent;
