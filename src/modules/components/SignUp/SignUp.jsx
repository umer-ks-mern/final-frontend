import React from "react";
import "./SignUp.css";
import * as Yup from "yup";
import { Field, FormikProvider, useFormik } from "formik";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const SignUp = () => {
  let schema = Yup.object({
    name: Yup.string().required("Name is required"),
    username: Yup.string().required("user_name is required"),
    email: Yup.string()
      .email("Email should be valid")
      .required("Email is required"),
    phone: Yup.string().max(15).min(11),
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
    
      })
      .catch((err) => {
        toast.error("User not created!");
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
                    <br />
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
