import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { Field, FormikProvider, useFormik } from "formik";
import { toast } from "react-toastify";
import Comment from "../../components/comment/Comment";

const Comments = () => {
  const { postId } = useParams();
  console.log(postId);
  const [post, setPost] = useState(null);
  const [likes, setLikes] = useState(1);

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
            <div>
              {post.comments.map((comment, index) => (
                <Comment key={index} comment={comment} />
                // <h6>{comment.comment_text}</h6>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Comments;
