import React, { useState, useEffect } from "react";
import "./UserProfile.css";

import { MDBCol, MDBRow } from "mdb-react-ui-kit";
import { useJwt } from "react-jwt";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../../App";

const UserProfile = () => {
  const email = useSelector((state) => state.auth.email);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    bio: "",
    followers: "",
    followings: "",
  });

  useEffect(() => {
    axios
      .get(`${baseUrl}/user/${email}`)
      .then((res) => {
        console.log(res.data[0]);
        setUser(res.data[0]);
        console.log(user);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <MDBRow>
        <div className="user-dp">
          <img src="/images/dp.jfif" alt="dp" className="dp" />
          <div>
            <span className="posts">77</span>
            <span className="followers">88</span>
            <span className="followings">33</span>
          </div>
        </div>
        <div className="user-info">
          <div className="user-name">{user.name}</div>
          <div className="user-bio">{user.bio}</div>
        </div>
        <br />
        <div className="btn-edit">
          <button onClick={() => navigate("/update-user")}>
            Edit your Profile
          </button>
        </div>
        <hr />
      </MDBRow>
      <div className="posts gallery">
        <MDBRow>
          <MDBCol lg={4} md={12} className="mb-4 mb-lg-0 ">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp"
              className="w-100 shadow-1-strong rounded mb-4"
              alt="Boat on Calm Water"
            />

            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/Vertical/mountain1.webp"
              className="w-100 shadow-1-strong rounded mb-4"
              alt="Wintry Mountain Landscape"
            />
          </MDBCol>

          <MDBCol lg={4} className="mb-4 mb-lg-0">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/Vertical/mountain2.webp"
              className="w-100 shadow-1-strong rounded mb-4"
              alt="Mountains in the Clouds"
            />

            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp"
              className="w-100 shadow-1-strong rounded mb-4"
              alt="Boat on Calm Water"
            />
          </MDBCol>

          <MDBCol lg={4} className="mb-4 mb-lg-0">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(18).webp"
              className="w-100 shadow-1-strong rounded mb-4"
              alt="Waves at Sea"
            />

            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/Vertical/mountain3.webp"
              className="w-100 shadow-1-strong rounded mb-4"
              alt="Yosemite National Park"
            />
          </MDBCol>
        </MDBRow>
      </div>
    </>
  );
};

export default UserProfile;
