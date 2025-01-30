import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import "./App.css";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import VerifyEmail from "./Pages/VerifyEmail";
import RedirectVerifyEmail from "./Pages/RedirectVerifyEmail";
import "toastr/build/toastr.min.css";
import Friends from "./Pages/Friends";
import Settings from "./Pages/Settings";
import Messages from "./Pages/Messages";
import Notifications from "./Pages/Notification";
import Search from "./Layout/Search";
import EditProfile from "./Pages/EditProfile";
import FullPhoto from "./Components/FullPhoto";
import Profile from "./Pages/Profile";
import ResetPassword from "./Pages/ResetPassword";
import ManagePhotos from "./Pages/ManagePhotos";
import EditPost from "./Pages/EditPost";
import DetailedPost from "./Pages/DetailedPost";
import ChatWith from "./Pages/ChatWith";
import ChatProvider from "./Context/ChatContext";
import Groups from "./Pages/Groups";
import GroupProfile from "./Pages/GroupProfile";


const App = () => {
  return (
    <ChatProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/group/visit/:id" element={<GroupProfile />} />
          <Route path="/settings/manage/photos" element={<ManagePhotos />} />
          <Route path="/image/:version/:data/:id" element={<FullPhoto />} />
          <Route path="/profiles/edit" element={<EditProfile />} />
          <Route path="/post/edit/:id" element={<EditPost />} />
          <Route path="/post/details/:id" element={<DetailedPost />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/messages/chat/:id" element={<ChatWith />} />
          <Route path="/search/:query" element={<Search />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-your-email" element={<VerifyEmail />} />
          <Route path="/verify/:token" element={<RedirectVerifyEmail />} />
          <Route
            path="/verify/reset-password/:token"
            element={<ResetPassword />}
          />
        </Routes>
      </Router>
    </ChatProvider>
  );
};

export default App;
