import React, { useState, useEffect } from "react";
import "./UserProfile.css";
import { decodeToken } from "react-jwt";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const handleImageUpdate = () => {
    navigate("/update-profile-picture");
  };
  useEffect(() => {
    setUser(decodeToken(JSON.parse(localStorage.getItem("token"))).user);
  }, []);

  return (
    <>
      {user && (
        <>
          <div className="user-dp">
            <img
              src={`http://localhost:3300/images/${user._id}.jpg`}
              alt="dp"
              className="dp"
              onClick={handleImageUpdate}
            />
            <span className="posts">0</span>
            <span className="followers">{user.followers.length}</span>
            <span className="followings">{user.following.length}</span>
          </div>
          <div className="user-info">
            <div className="user-name">{user.name}</div>
            <div className="user-bio">{user.bio}</div>
          </div>
          <div className="btn-edit">
            <button onClick={() => navigate("/update-user")}>
              Edit your Profile
            </button>
          </div>
          <hr />
          <div className="posts"></div>
        </>
      )}
    </>
  );
};

export default UserProfile;
