import React, { useState } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { MdSend } from "react-icons/md";
import { useChat } from "../Context/ChatContext";
import { useParams } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";


const MessageInput = () => {
  const [newMessage, setNewMessage] = useState("");


  const { sendMessage, setisEditingMode, setMessage, message, isEditingMode ,seteditingMessage , editingMessage} =
    useChat();



  const { id } = useParams();
  return (
    <div className="p-4 bg-white shadow-md sticky bottom-0 flex flex-col items-center ">
      {
        !isEditingMode?"": 
        <div className="relative bg-gray-200  roundeds w-full p-2 z-50"> 
          <button onClick={()=>{
            setisEditingMode(false)
            seteditingMessage('')
            setMessage({})
          }} className="absolute -top-0 text-2xl -right-0 hover:text-red-600">
          <RxCross2 title="cancel" />
          </button>
          {
            message?.Message
          }
        </div>
      }
      <div className="flex items-center space-x-3 w-full">
        <input
          type="text"
          value={isEditingMode?editingMessage:newMessage}
          onChange={(e) => {
            if(isEditingMode){
              seteditingMessage(e.target.value)
            }else{
              setNewMessage(e.target.value)
            }
          }}
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 border rounded-full focus:outline-none"
        />
        <button
          onClick={() => {
            sendMessage(id, newMessage);
            setNewMessage("");
          }}
          className="p-2 bg-blue-600 rounded-full text-white hover:bg-blue-700"
        >
          <MdSend className="text-xl" />
        </button>
      </div>
    </div>
  );
};

export default MessageInput;
