import React, { createContext, useContext, useEffect, useState } from "react";
import fetcher from "../Utils/axios";
import toastr from "toastr";
import { UseCreatedContext } from "./UserContext";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [Messages, setMessages] = useState([]);
  const [Friends, setFriends] = useState([]);
  const [ActiveChats, setActiveChats] = useState([]);
  const [ActiveFriend, setActiveFriend] = useState({});
  const [activeUserId, setActiveUserId] = useState("");
  const [Loading, setLoading] = useState(true);
  const [isEditingMode, setisEditingMode] = useState(false);
  const [message, setMessage] = useState({});
  const [editingMessage, seteditingMessage] = useState("");

  const { Socket, User } = UseCreatedContext();

  useEffect(() => {
    fetcher
      .get("/message/getchats")
      .then((res) => {
        setFriends(res.data.friends);
        setMessages(res.data.chats);
      })
      .catch((err) => {
        toastr.error(err?.response?.data.message);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    Socket?.on("Message", (data) => {
      const newMessage = data.newMessage;
      const audio = document.getElementById("notice");

      if (audio) {
        audio.play().catch((err) => {
          console.warn("Audio play failed due to user interaction policy:", err);
        });
      }

      toastr.info("New Message");

      if (newMessage.Sender === activeUserId) {
        setActiveChats((prev) => [...prev, newMessage]);
      }

      let newList = Messages.filter((itm) => itm.chatsWith._id !== newMessage.Sender);
      newList.push({
        chatsWith: data?.sender,
        lastText: newMessage.Message.length > 15 ? newMessage.Message.slice(0, 15) + "..." : newMessage.Message,
      });

      setMessages(newList);
    });

    return () => Socket?.off("Message");
  }, [Socket, Messages, activeUserId]);

  useEffect(() => {
    Socket?.on("editMessage", (data) => {
      if (activeUserId == data?.sender) {
        let newChat = ActiveChats.map((itm) => {
          if (itm._id === data.messageId) {
            return { ...itm, Message: data.newMessage };
          }
          return itm;
        });
        setActiveChats(newChat);
      }
    });

    return () => Socket?.off("editMessage");
  }, [Socket, activeUserId, ActiveChats]);

  const addMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  useEffect(() => {
    if (activeUserId) {
      setLoading(true);
      fetcher
        .get(`message/specific/${activeUserId}`)
        .then((res) => {
          setActiveFriend(res.data?.user);
          setActiveChats(res.data?.data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => setLoading(false));
    }
  }, [activeUserId]);

  const sendMessage = async (id, text) => {
    if (isEditingMode) {
      fetcher
        .put(`message/edit`, {
          newMessage: editingMessage,
          messageId: message._id,
        })
        .then(() => {
          let newChat = ActiveChats.map((itm) =>
            itm._id === message._id ? { ...itm, Message: editingMessage } : itm
          );

          setActiveChats(newChat);
          setisEditingMode(false);
          seteditingMessage("");
          setMessage({});
        })
        .catch(() => toastr.error("Failed"));
    } else {
      fetcher
        .post(`message/send`, {
          receiverId: id,
          message: text,
          isShared: false,
        })
        .then((res) => {
          let data = res.data.data;
          setActiveChats([...ActiveChats, data]);

          let newList = Messages.filter((itm) => itm.chatsWith._id !== id);
          newList.push({
            chatsWith: res.data.receiver,
            lastText: text.length > 15 ? text.slice(0, 15) + "..." : text,
          });

          setMessages(newList);
        })
        .catch(() => toastr.error("Failed"));
    }
  };

  return (
    <ChatContext.Provider
      value={{
        sendMessage,
        Messages,
        addMessage,
        Friends,
        Loading,
        ActiveChats,
        setActiveUserId,
        ActiveFriend,
        setActiveChats,
        isEditingMode,
        setisEditingMode,
        message,
        setMessage,
        editingMessage,
        seteditingMessage,
      }}
    >
      {children}
      <audio id="notice" src="/notification.mp3" className="hidden" />
    </ChatContext.Provider>
  );
};

export default ChatProvider;
export const useChat = () => useContext(ChatContext);
