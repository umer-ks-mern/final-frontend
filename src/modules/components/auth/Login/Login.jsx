import { Field, FormikProvider, useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";


const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const schema = Yup.object({
    email: Yup.string()
      .required("Email is a required field")
      .email("Invalid email format"),
    password: Yup.string()
      .required("Password is a required field")
      .min(8, "Password must be at least 8 characters"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      
      handleLogin(values);
    },
  });

  const handleLogin = async (user) => {
   
    await axios
      .post("http://localhost:3300/signin", user)
      .then((res) => {
        localStorage.setItem("token", JSON.stringify(res.data.token));
        navigate("/");
      })
      .catch((err) => {
        toast.error("Invalid Credentials!");
      
      })
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
           
          </div>
          {formik.touched.email && formik.errors.email && (
              <h6 style={{ color: "red" }}>{formik.errors.email}</h6>
            )}
          <div className="input-group">
            <span className="input-group-addon">
              <i className="icofont icofont-email"></i>
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
          <p>Forgot password? <Link to={"/reset-password"}>Reset Password</Link></p>
          <div>
            <button
              type="button"
              className="login-btn"
              onClick={formik.handleSubmit}
            >
              Login
            </button>
            <p>
              Don't have an account? <Link to={"/signup"}>SignUp</Link>
            </p>
          </div>
        </form>
      </FormikProvider>
    </div>
  );
};
export default Login;
