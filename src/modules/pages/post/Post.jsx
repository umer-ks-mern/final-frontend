import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const Post = () => {
  const { postId } = useParams();
  console.log(postId);
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3300/post/${postId}`)
      .then((res) => {
        console.log(res.data);
        setPost(res.data);
      })
      .catch((err) => {
        toast.error("Post Does Not Exist!");
        console.log(err);
      });
  }, []);

  const handleLike = () => {
    axios
      .post(`http://localhost:3300/likes/${postId}`, {
        user_id: post.user_id._id,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <>
      {post && (
        <div>
          <div>
            <img
              src={`http://localhost:3300/images/${post.user_id._id}.jpg`}
              alt="dp"
              className="dp"
              height={100}
              width={100}
            />
          </div>
          <h2>{post.user_id.name}</h2>
          <h6>
            {new Date(post.updatedAt).toLocaleTimeString()}{" "}
            {new Date(post.updatedAt).toLocaleDateString()}
          </h6>

          <h2>{post.caption}</h2>
          <img
            src={`http://localhost:3300/images/${postId}.jpg`}
            alt="post-img"
            className="post-img"
            height={500}
            width={500}
          />
          <div>
            <button>Comment</button>
            <button onClick={handleLike}>Like</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Post;
