import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { Field, FormikProvider, useFormik } from "formik";
import { toast } from "react-toastify";

const Comment = (_comment) => {
  console.log(_comment);
  const { postId } = useParams();
  console.log(postId);
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState(_comment.comment);
  const [replyClicked, setReplyClicked] = useState(false);

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

  let schema = Yup.object({
    reply: Yup.string().required("reply is required"),
  });

  const formik = useFormik({
    initialValues: {
      reply: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      handleReply({
        user_id: post.user_id._id,
        reply_text: values.reply,
      });
    },
  });

  const handleReply = (data) => {
    axios
      .post(`http://localhost:3300/comment/reply/${postId}/${comment._id}`, data)
      .then((res) => {
        console.log("reply posted");
        console.log(res);
        setReplyClicked(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {post && (
        <div>
          <h2>{comment.user_id.name}</h2>
          <h4>{comment.comment_text}</h4>
          <h6
            onClick={() => setReplyClicked(true)}
            style={{ cursor: "pointer" }}
          >
            Reply
          </h6>
          {replyClicked && <div className="col-12">
            <FormikProvider value={formik}>
              <form className="w-100">
                <div className="input-group">
                  <span className="input-group-addon">
                    <i className="icofont"></i>
                  </span>
                  <Field
                    type="text"
                    placeholder="reply"
                    className="form-control"
                    autoComplete="off"
                    name="reply"
                  />
                </div>
                {formik.touched.reply && formik.errors.reply && (
                  <h6 style={{ color: "red" }}>{formik.errors.reply}</h6>
                )}
                <br />
                <div className="m-t-20">
                  <button
                    className="btn btn-primary btn-md btn-block m-b-10"
                    type="submit"
                    onClick={formik.handleSubmit}
                  >
                    Add Reply
                  </button>
                </div>
              </form>
            </FormikProvider>
            {/* <div>
              {post.comments.map((comment, index) => (
                <Comment key={index} comment={comment} />
                // <h6>{comment.comment_text}</h6>
              ))}
            </div> */}
          </div>}
        </div>
      )}
    </>
  );
};

export default Comment;
