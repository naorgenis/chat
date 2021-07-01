import React from "react";
import LogoutButton from "../components/logout-button";
import UserProfile from "../components/user-profile";
import Channel from "../services/Channel";
import { useAuth0 } from "@auth0/auth0-react";
import "./chatScreen.css";

function ChatScreen({ db }) {
  const { user } = useAuth0();

  return (
    <div className="row main-container">
      <div className="col-5">
        <UserProfile />
      </div>
      <div className="col-1 logoutBtn">
        <LogoutButton />
      </div>
      <div className="chat">
        <Channel user={user} db={db} />
      </div>
    </div>
  );
}

export default ChatScreen;
