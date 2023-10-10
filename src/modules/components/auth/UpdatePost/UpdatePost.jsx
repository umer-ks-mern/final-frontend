import React, { useState } from "react";
import "./UpdatePost.css";
import * as Yup from "yup";
import { Field, FormikProvider, useFormik } from "formik";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { decodeToken } from "react-jwt";

const UpdatePost = (postId) => {
  const navigate = useNavigate();
  let schema = Yup.object({
    caption: Yup.string().required("Caption is required"),
  });

  const formik = useFormik({
    initialValues: {
      caption: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      handleUpdate({ caption: values.caption });
    },
  });

  const handleUpdate = async (data) => {
    await axios
      .post(`http://localhost:3300/post/${postId}`, data)
      .then((res) => {
        toast.success("Post updated successfully!");
        console.log(res);
      })
      .catch((err) => {
        toast.error("Post not updated!");
        console.log(err);
      });
  };

  return (
    <div className="container">
      <div className="row w-530">
        <div className="col-sm-12 d-flex loginform">
          <div className="login-card card-block auth-body">
            <div className="authbox">
              <img src="images/logoo.png" className="brand-logo text-center" />
              <br />
              <h3 className="text-secondary text-center">Create a Post</h3>
              <br />

              <div className="col-12">
                <FormikProvider value={formik}>
                  <form className="w-100">
                    <div className="input-group">
                      <span className="input-group-addon">
                        <i className="icofont icofont-email"></i>
                      </span>
                      <Field
                        type="text"
                        placeholder="caption"
                        className="form-control"
                        required
                        autoComplete="off"
                        name="caption"
                      />
                    </div>
                    {formik.touched.caption && formik.errors.caption && (
                      <h6 style={{ color: "red" }}>{formik.errors.caption}</h6>
                    )}
                    <br />
                    <div className="m-t-20">
                      <button
                        className="btn btn-primary btn-md btn-block m-b-10 signupbtn"
                        type="submit"
                        onClick={formik.handleSubmit}
                      >
                        Update
                      </button>
                    </div>
                  </form>
                </FormikProvider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatePost;
