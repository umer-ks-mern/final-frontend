import React, { useState } from "react";
import "./SignUp.css";
import * as Yup from "yup";
import { Field, FormikProvider, useFormik } from "formik";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  let schema = Yup.object({
    name: Yup.string().required("Name is required"),
    username: Yup.string().required("user_name is required"),
    email: Yup.string()
      .email("Email should be valid")
      .required("Email is required"),
    phone: Yup.string().required().max(15).min(11),
    password: Yup.string().required("*Required").min(8),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      username: "",
      email: "",
      phone: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      handleSignUp(values);
    },
  });

  const handleSignUp = async (data) => {
    await axios
      .post("http://localhost:3300/signup", data)
      .then((res) => {
        toast.success("user created successfully!");
        console.log(res);
        userId = res.data.user._id;
        handleUpload();
      })
      .catch((err) => {
        toast.error("User not created!");
        console.log(err);
      });
  };

  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState("");
  let userId = "";

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
    const renamedFileName = `${userId}.${fileExtension}`;
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
              <h3 className="text-secondary text-center">
                Signup to see photos and videos from you friends
              </h3>
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
                        placeholder="full-name"
                        className="form-control"
                        required
                        autoComplete="off"
                        name="name"
                      />
                    </div>
                    {formik.touched.name && formik.errors.name && (
                      <h6 style={{ color: "red" }}>{formik.errors.name}</h6>
                    )}
                    <div className="input-group">
                      <span className="input-group-addon">
                        <i className="icofont icofont-email"></i>
                      </span>
                      <Field
                        type="text"
                        placeholder="user_name"
                        className="form-control"
                        required
                        autoComplete="off"
                        name="username"
                      />
                    </div>
                    {formik.touched.username && formik.errors.username && (
                      <h6 style={{ color: "red" }}>{formik.errors.username}</h6>
                    )}
                    <div className="input-group">
                      <span className="input-group-addon">
                        <i className="icofont icofont-email"></i>
                      </span>
                      <Field
                        type="email"
                        placeholder="email"
                        className="form-control"
                        required
                        autoComplete="off"
                        name="email"
                      />
                    </div>
                    {formik.touched.email && formik.errors.email && (
                      <h6 style={{ color: "red" }}>{formik.errors.email}</h6>
                    )}
                    <div className="input-group">
                      <span className="input-group-addon">
                        <i className="icofont icofont-email"></i>
                      </span>
                      <Field
                        type="text"
                        placeholder="phone"
                        className="form-control"
                        required
                        autoComplete="off"
                        name="phone"
                      />
                    </div>
                    {formik.touched.phone && formik.errors.phone && (
                      <h6 style={{ color: "red" }}>{formik.errors.phone}</h6>
                    )}
                    <div className="input-group">
                      <span className="input-group-addon">
                        <i className="icofont icofont-password"></i>
                      </span>
                      <Field
                        type="password"
                        placeholder="password"
                        className="form-control"
                        required
                        autoComplete="off"
                        name="password"
                      />
                    </div>
                    {formik.touched.password && formik.errors.password && (
                      <h6 style={{ color: "red" }}>{formik.errors.password}</h6>
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
                        Sign Up
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

export default SignUp;
