import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { baseUrl } from "../../../App";
import axios from "axios";
import { decodeToken } from "react-jwt";
import { MDBRow } from "mdb-react-ui-kit";

const OtherUsers = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const currentUser = useState(
    decodeToken(JSON.parse(localStorage.getItem("token"))).user
  );
  const [user, setUser] = useState(null);
  const [isFollowed, setIsFollowed] = useState();
  const [posts, setPosts] = useState([{}]);
  const [followButtonText, setFollowButtonText] = useState("");
  let temp_count = 0;
  useEffect(() => {
    axios
      .get(`${baseUrl}/user/${id}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`${baseUrl}/user-posts/${id}`)
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    user && user.followers.includes(currentUser[0]._id)
      ? setIsFollowed(true)
      : setIsFollowed(false);
  }, [user]);

  useEffect(() => {
    console.log("isFollowed:", isFollowed);
    setFollowButtonText(isFollowed ? "Unfollow" : "Follow");
  }, [isFollowed]);

  const handleFollow = () => {
    axios
      .put(`${baseUrl}/user/followers/${id}/${currentUser[0]._id}`)
      .then((res) => {
        setIsFollowed(!isFollowed);
        console.log(res);
        setUser(res.data.user);
      })
      .catch((err) => {
        console.log(err);
      });
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
              />
              <span className="posts">0</span>
              <img src="/images/vertical-lines.png" className="bars" />
              <span className="followers">{user.followers.length}</span>
              <img src="/images/vertical-lines.png" className="bars" />
              <span className="followings">{user.following.length}</span>
            </div>
            <div className="user-info">
              <div className="user-name">{user.name}</div>
              <div className="user-bio">{user.bio}</div>
            </div>
            <div className="btn-edit">
              <button onClick={handleFollow}>{followButtonText}</button>
            </div>
            <hr />
          </MDBRow>
          <hr />
          <div className="posts">
            <div className="post-gallery">
              {posts.map((image, index) => (
                <div key={index} className="post-image">
                  <img
                    src={`http://localhost:3300/images/${image._id}.jpg`}
                    alt={`Post ${index + 1}`}
                    onClick={() => {
                      navigate(`/post/${image._id}`);
                    }}
                    style={{ cursor: "pointer" }}
                  />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default OtherUsers;
