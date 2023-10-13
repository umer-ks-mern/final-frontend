import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { Field, FormikProvider, useFormik } from "formik";
import { toast } from "react-toastify";
import './Post.css';

const Post = () => {
  const { postId } = useParams();
  console.log(postId);
  const [post, setPost] = useState(null);
  const [likes, setLikes] = useState(0);
  const navigate = useNavigate();

  let schema = Yup.object({
    comment: Yup.string().required("comment is required"),
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

  return (
    <>
      {post && (
        <div>
          <span>
            <img
              src={`http://localhost:3300/images/${post.user_id._id}.jpg`}
              alt="dp"
              className="user-dp"
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
            <h6
              onClick={() => navigate(`/post/likes/${postId}`)}
              style={{ cursor: "pointer" }}
            >
              Likes {post.likes.length}
            </h6>
            <h6
              onClick={() => navigate(`/post/comments/${postId}`)}
              style={{ cursor: "pointer" }}
            >
              Comments {post.comments.length}
            </h6>
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
                    placeholder="comment"
                    className="form-control"
                    autoComplete="off"
                    name="comment"
                  />
                </div>
                {formik.touched.comment && formik.errors.comment && (
                  <h6 style={{ color: "red" }}>{formik.errors.comment}</h6>
                )}
                <br />
                <div className="m-t-20">
                  <button
                    className="btn btn-primary btn-md btn-block m-b-10"
                    type="submit"
                    onClick={formik.handleSubmit}
                  >
                    Comment
                  </button>
                </div>
              </form>
            </FormikProvider>
          </div>
        </div>
      )}
    </>
  );
};

export default Post;
