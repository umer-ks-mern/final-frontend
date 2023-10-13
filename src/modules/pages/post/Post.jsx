import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { Field, FormikProvider, useFormik } from "formik";
import { toast } from "react-toastify";
import './Post.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const Post = () => {
  const { postId } = useParams();
  console.log(postId);
  const [post, setPost] = useState(null);
  const [likes, setLikes] = useState(0);
  const navigate = useNavigate();

  let schema = Yup.object({
    comment: Yup.string()
  });

  const formik = useFormik({
    initialValues: {
      comment: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      handleComment({
        user_id: post.user_id._id,
        comment_text: values.comment,
      });
      formik.resetForm();
    },
  });

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
  }, [likes]);

  const handleLike = () => {
    axios
      .post(`http://localhost:3300/likes/${postId}`, {
        user_id: post.user_id._id,
      })
      .then((res) => {
        console.log(res);
        setLikes(likes + 1);
        toggleRed();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleComment = (data) => {
    console.log(data);
    axios
      .post(`http://localhost:3300/comment/${postId}`, data)
      .then((res) => {
        console.log(res);
        setLikes(likes + 1);

      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [isRed, setIsRed] = useState(false);

  const toggleRed = () => {
    setIsRed(!isRed);
  };

  const iconColor = isRed ? 'red' : 'black';


  return (
    <>
      {post && (
        <div>
          <span>
            <img
              src={`http://localhost:3300/images/${post.user_id._id}.jpg`}
              alt="dp"
              className="post-dp"
              height={100}
              width={100}
            />
          </span>
          <span>
          <p className="user-name">{post.user_id.name}</p>
          </span>
          <p className="post-date">
            {new Date(post.updatedAt).toLocaleTimeString()}{" "}
            {new Date(post.updatedAt).toLocaleDateString()}
          </p>

          <h2>{post.comment}</h2>
          <img
            src={`http://localhost:3300/images/${postId}.jpg`}
            alt="post-img"
            className="post-img"
            height={500}
            width={500}
            onClick={handleLike}
            style={{ cursor: "pointer" }}
          />
          <div>
           
               <div className="heart">
      <FontAwesomeIcon
        icon={faHeart}
        onClick={toggleRed}
        style={{ color: iconColor, cursor: 'pointer', width:"500px", height:"25px" }}
        
      />
     <h6
              onClick={() => navigate(`/post/likes/${postId}`)}
              style={{ cursor: "pointer" }}
            >
     {post.likes.length}
            </h6>
            </div>
           <span><img src="/images/chat.png" alt="/" className="comment-icon"  onClick={() => navigate(`/post/comments/${postId}`)} /><p className="comment-count"> {post.comments.length}</p><h6
             
              style={{ cursor: "pointer" }}
            >
            
            </h6></span>
          </div>
          <div className="col-12">
            <FormikProvider value={formik}>
              <form className="w-100">
                <div className="input-group">
                  <span className="input-group-addon">
                    <i className="icofont"></i>
                  </span>
                  <Field
                    type="text"
                    placeholder="share your thoughts"
                    className="comment-field"
                    autoComplete="off"
                    name="comment"
                  />
                  <div className="m-t-20">
                  <button
                    className="btn btn-primary btn-md btn-block m-b-10 comment-btn"
                    type="submit"
                    onClick={formik.handleSubmit}
                  >
                    Comment
                  </button>
                </div>
                </div>
                {formik.touched.comment && formik.errors.comment && (
                  <h6 style={{ color: "red" }}>{formik.errors.comment}</h6>
                )}
                <br />
                
              </form>
            </FormikProvider>
          </div>
        </div>
      )}
    </>
  );
};

export default Post;
