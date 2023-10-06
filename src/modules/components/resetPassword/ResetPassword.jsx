import { Field, FormikProvider, useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import "./resetPassword.css";
import axios from "axios";
import {  useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setEmail } from "../auth/store";
import { toast } from "react-toastify";


const ResetPassword = () => {
 const dispath = useDispatch()
 const navigate=useNavigate();
  const emailSchema = Yup.object({
    email: Yup.string()
      .required("Email is a required field")
      .email("Invalid email format"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema:emailSchema,
    onSubmit: (values) => {
      console.log(values);
     
      generateOtp(values.email);
    },
  });

  

  const generateOtp = async (email) => {
 
    await axios
      .get(`http://localhost:3300/otp/${email}`)
      .then((res) => {
        toast.success("OTP send to your email-address");
        console.log(res);
        localStorage.setItem("user_email", JSON.stringify(email));
        dispath(setEmail(email));
        navigate("/confirm-otp");
      })
      .catch((err) => {
        toast.error("Email not found!")
        console.log(err);
      });
  };

  return (
    <div>
      <img src="images/logoo.png" className="brand-logo text-center" />
      <FormikProvider value={formik}>
        <form className="w-100">
          <div className="input-group">
            <span className="input-group-addon">
              <i className="icofont icofont-email"></i>
            </span>
            <Field
              type="email"
              name="email"
              placeholder="email"
              className="form-control"
              required
              autoComplete="off"
            />
            {formik.touched.email && formik.errors.email && (
              <h6 style={{ color: "red" }}>{formik.errors.email}</h6>
            )}
          </div>
          <div>
            <button
              type="button"
              onClick={formik.handleSubmit}
              className="code-btn"
            >
             Send Code
            </button>
          </div>
        </form>
      </FormikProvider>
    </div>
  );
};
export default ResetPassword;
