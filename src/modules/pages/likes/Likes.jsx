import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { Field, FormikProvider, useFormik } from "formik";
import { toast } from "react-toastify";
import Comment from "../../components/comment/Comment";

const Likes = () => {
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

  const getUser = async (userId) => {
    await axios
      .get(`http://localhost:3300/user/${userId}`)
      .then((res) => {
        console.log(res.data);
        return (res.data.name)
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
          <br />
          <div>
            {post.likes.map((like, index) => (
              <div key={index}>
                {console.log(like)}
                <img
                  src={`http://localhost:3300/images/${like.user_id}.jpg`}
                  alt="dp"
                  className="dp"
                  height={50}
                  width={50}
                />
                <h6>{like.user_id}</h6>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Likes;
