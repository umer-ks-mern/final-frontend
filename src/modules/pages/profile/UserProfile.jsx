import React, { useState,useEffect } from 'react'
import './UserProfile.css';

import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const UserProfile=()=> {
  const email = useSelector((state)=> state.auth.email)
  const navigate=useNavigate();
const [user,setUser]=useState({
  name:"",
  bio:"",
});

useEffect(()=>{
axios.get(`http://localhost:3300/user/${email}`).then((res)=>{
  console.log(res.data[0]);
  setUser({name:res.data.name,bio:res.data.bio});
  console.log(user);
}).catch((err)=>console.log(err))
},[]);

  return (
  <>
  <div className='user-dp'>
  <img src='/images/dp.jfif'alt='dp' className='dp'/>
  <span className='posts'>00</span>
  <span className='followers'>99</span>
  <span className='followings'>00</span>
  </div>
  <div className="user-info">
    <div className="user-name">{user.name}</div>
    <div className="user-bio">{user.bio}</div>
  </div>
  <div className="btn-edit">
    <button onClick={navigate("/update-user")}>Edit your Profile</button>
  </div>
  <hr/>
  <div className='posts'>
  
  </div>
  </>

  )
};

export default UserProfile;