import React, { useState } from 'react'
import './UserProfile.css';
const UserProfile=()=> {

const [user,setUser]=useState({
user_name:"",
bio:"",
followers:"",
followings:""  
});

// useEffect(()=>{
// axios.get(`http://localhost:3300/user/${user_id}`).then((res)=>{
//   setUser(res.data);
// }).catch((err)=>console.log(err))
// },[]);

  return (
  <>
  <div className='user-dp'>
  <img src='/images/dp.jfif'alt='dp' className='dp'/>
  <span className='posts'>8</span>
  <span className='followers'>88</span>
  <span className='followings'>77</span>
  </div>
  <div className="user-info">
    <div className="user-name">User-name</div>
    <div className="user-bio">here's my bio</div>
  </div>
  <div className="btn-edit">
    <button>Edit your Profile</button>
  </div>
  <hr/>
  <div className='posts'>
  
  </div>
  </>

  )
};

export default UserProfile;