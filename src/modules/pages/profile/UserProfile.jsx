import React, { useEffect, useState } from "react";
import "./UserProfile.css";
import { decodeToken } from "react-jwt";
import { useNavigate } from "react-router-dom";
import { MDBRow } from "mdb-react-ui-kit";
import axios from "axios";
import { baseUrl } from "../../../App";

const UserProfile = () => {
  const navigate = useNavigate();
  const userr = useState(
    decodeToken(JSON.parse(localStorage.getItem("token"))).user
  );
  console.log(userr);
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([{}]);
  useEffect(() => {
    axios
      .get(`${baseUrl}/user/${userr[0]._id}`)
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`${baseUrl}/user-posts/${userr[0]._id}`)
      .then((res) => {
        // console.log(res.data);
        setPosts(res.data);
        console.log(posts);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleImageUpdate = () => {
    navigate("/update-profile-picture");
  };

  return (
    <>
      {user && (
        <>
          <MDBRow>
            <div className="user-dp">
              <img
                src={`http://localhost:3300/images/${user._id}.jpg`}
                alt="dp"
                className="dp"
                onClick={handleImageUpdate}
              />
              <span className="posts">0</span>
              <img src="images/vertical-lines.png" className="bars" />
              <span className="followers">{user.followers.length}</span>
              <img src="images/vertical-lines.png" className="bars" />
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
          </MDBRow>
          <hr />

          <div className="post-gallery">
            {posts.map((image, index) => (
              <div key={index} className="post-image">
                <img
                  src={`http://localhost:3300/images/${image._id}.jpg`}
                  alt={`Post ${index + 1}`}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default UserProfile;
