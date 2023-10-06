import React, { useState } from "react";
import axios from 'axios';
const Post = () => {
  
   const [caption,setCaption]=useState("");
    const [image, setImage] = useState("");

  const handleUpload = (e) => {
    e.preventDefault();
    const formData = new FormData();
 
    formData.append("file", image);
  

    axios.post(
      "http://localhost:3300/api/images",
      formData
  )
      .then(res => {
      
        console.log(res);
      })
      .catch(err => {
   
        console.error( err);
      });
  }

  
  return (
    <>
         <input type="text" className="caption" placeholder="add caption" autoComplete="off" onChange={(e) => {
            setCaption(e.target.value);
          }}/>
      
        <input
          type="file"
          name="file"
          className="Form-control"
          required
          autoComplete="off"
          onChange={(e) => {
            setImage(e.target.files[0]);
          }}/>
         
           <button onClick={handleUpload}>Upload Image</button>
   
     

    
    </>
  );
};

export default Post;
