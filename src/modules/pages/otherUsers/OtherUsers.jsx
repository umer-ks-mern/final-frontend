import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { baseUrl } from "../../../App";
import axios from "axios";
import { decodeToken } from "react-jwt";
import { MDBRow } from "mdb-react-ui-kit";

const OtherUsers=()=>{
  const {id}=useParams()
    const navigate = useNavigate();
    const userr= useState(decodeToken(JSON.parse(localStorage.getItem("token"))).user);
    console.log(userr)
    const [user,setUser]=useState(null);
   const[posts,setPosts]=useState([{ }]);
  useEffect(()=>{
    
    axios
    .get(`${baseUrl}/user/${id}`)
    .then((res) => {
      console.log(res.data);
     setUser(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
  
    axios.get(`${baseUrl}/user-posts/${id}`)
  .then((res) => {
    // console.log(res.data);
   setPosts(res.data);
   console.log(posts);
  })
  .catch((err) => {
    console.log(err);
  })
  },[]);
  
  
  
    const handleImageUpdate = () => {
      navigate("/update-profile-picture");
    };

  const handleFollow=()=>{
    axios.put(`${baseUrl}/user/followers/${id}/${userr[0]._id}`).then((res)=>{
      console.log(res);
      userr.followers=res.data.followers.length;
    }).catch((err)=>{
      console.log(err);
    })
  
  }

    return(
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
          <button onClick={handleFollow}>
            Follow
          </button>
        </div>
        <hr />
        </MDBRow>
        <hr/>
        <div className="posts">
   
        <div className="post-gallery">
      {posts.map((image, index) => (
        <div key={index} className="post-image">
          <img src={`http://localhost:3300/images/${image._id}.jpg`} alt={`Post ${index + 1}`}  onClick={()=>{
                    navigate(`/post/${image._id}`)
                  }}  style={{cursor:"pointer"}}/>
        </div>
      ))}
    </div>
      
</div>
</>
    )}
    </>
 
 )
};
 
 
     
 

export default OtherUsers;