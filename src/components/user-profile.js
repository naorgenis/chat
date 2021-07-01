import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

function UserProfile(props) {
  const { user } = useAuth0();
  return (
    <div className="row">
      <div className="col-1">
        <img width={40} src={user.picture} alt="Profile" />
      </div>
      <div className="col-2">
        <p>Hello, {user.nickname}</p>
      </div>
    </div>
  );
}

export default UserProfile;
