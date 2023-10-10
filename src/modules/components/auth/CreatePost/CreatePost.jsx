import React, { useState } from "react";
import "./CreatePost.css";
import * as Yup from "yup";
import { Field, FormikProvider, useFormik } from "formik";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { decodeToken } from "react-jwt";

const CreatePost = () => {
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
      handlePost({
        caption: values.caption,
        user_id: decodeToken(JSON.parse(localStorage.getItem("token"))).user
          ._id,
      });
    },
  });

  const handlePost = async (data) => {
    await axios
      .post("http://localhost:3300/post", data)
      .then((res) => {
        toast.success("Post created successfully!");
        console.log(res);
        postId = res.data.post._id;
        console.log(postId);
        handleUpload();
      })
      .catch((err) => {
        toast.error("Post not created!");
        console.log(err);
      });
  };

  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState("");
  let postId = "";

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!selectedFile) {
      setMessage("Please select a file.");
      return;
    }

    const originalFileName = selectedFile.name;
    const fileExtension = originalFileName.split(".").pop(); // Replace with your product ID or generate as needed
    const renamedFileName = `${postId}.${fileExtension}`;
    const renamedFile = new File([selectedFile], renamedFileName, {
      type: selectedFile.type,
    });

    const formData = new FormData();
    formData.append("image", renamedFile);

    axios
      .post("http://localhost:3300/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setMessage(response.data);
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
        setMessage("An error occurred while uploading the image.");
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
                      <input
                        name="image"
                        type="file"
                        accept=".jpg"
                        onChange={handleFileChange}
                      />
                      <br />
                      <p>{message}</p>
                    </div>
                    <div className="m-t-20">
                      <button
                        className="btn btn-primary btn-md btn-block m-b-10 signupbtn"
                        type="submit"
                        onClick={formik.handleSubmit}
                      >
                        Create Post
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

export default CreatePost;
