import React, { useEffect, useState } from 'react';
import { baseUrl } from '../../../App';
import axios from 'axios';


const Gallery=()=> {

  const [post, setPost] = useState(null);
useEffect(()=>{
  axios
  .get(`${baseUrl}/posts`)
  .then((res) => {
    console.log(res.data);
    setPost(res.data);
  })
  .catch((err) => {
    toast.error("Post Does Not Exist!");
    console.log(err);
  });
},[])


  return (
    <div className="container-fluid">
      <div className="px-lg-5">
        <div className="row py-5">
          <div className="col-lg-12 mx-auto">
            <div className="text-white p-5 shadow-sm rounded banner">
              <h1 className="display-4">Explore the World</h1>
              <p className="lead">Dive into the Colors</p>
             
            </div>
          </div>
        </div>
        <div className="row">
          {post.map((item, index) => (
            <GalleryItem key={index} post={item}/>
          ))}
        </div>
      
      </div>
    </div>
  );
}

function GalleryItem(post) {
  return (
    <div className="col-xl-3 col-lg-4 col-md-6 mb-4">
      <div className="bg-white rounded shadow-sm">
        <img src={`/images/${post.user_id}.jpg`} alt="/" className="img-fluid card-img-top" />
        <div className="p-4">
          
          <p className="small text-muted mb-0">{post.caption}</p>
          <div className="d-flex align-items-center justify-content-between rounded-pill bg-light px-3 py-2 mt-4">
            <p className="small mb-0">
              <i className="fa fa-picture-o mr-2"></i>
              <span className="font-weight-bold">{post.likes}</span>
            </p>
            <div className="badge badge-danger px-3 rounded-pill font-weight-normal">{post.comment}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Gallery;
