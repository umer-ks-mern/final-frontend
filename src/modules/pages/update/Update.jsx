import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import { Field, FormikProvider, useFormik } from "formik";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { baseUrl } from "../../../App";
import {decodeToken} from "react-jwt";

const UpdateUser=()=>{

  
    // const email = useSelector((state)=> state.auth.email);
    const [user,setUser]=useState({});
    setUser(decodeToken(localStorage.getItem("token")).user);
    const navigate = useNavigate();
    let schema = Yup.object({
      name: Yup.string(),
      email: Yup.string()
        .email("Email should be valid"),
      bio: Yup.string()
      
    });

    const formik = useFormik({
      initialValues: {
        name: user.username,
        email: user.email,
        bio: user.bio
      },
      validationSchema: schema,
      onSubmit: (values) => {
        handleUpdate(values);
        console.log(values);
      },
    });

   
  
    const handleUpdate = async (data) => {
      await axios
        .put(`${baseUrl}/user/${user.email}`, data)
        .then((res) => {
          toast.success("User Updated successfully!");
          console.log(res);
          navigate("");
        })
        .catch((err) => {
          toast.error("User not updated!");
          console.log(err);
        });
    };
  

    return (
        <>
         <div className="container">
      <div className="row w-530">
        <div className="col-sm-12 d-flex loginform">
          <div className="login-card card-block auth-body">
            <div className="authbox">
            
              <br />
              <h3 className="text-secondary text-center">
                Update your Profile
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
                        value={formik.name}
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
                        type="email"
                        placeholder="email"
                        className="form-control"
                       value={formik.email}
                        autoComplete="off"
                        name="email"
                      />
                    </div>
                    {formik.touched.email && formik.errors.email && (
                      <h6 style={{ color: "red" }}>{formik.errors.email}</h6>
                    )}
                    
                    <div className="input-group">
                      <span className="input-group-addon">
                        <i className="icofont icofont-password"></i>
                      </span>
                      <Field
                        type="text"
                        placeholder="bio"
                        className="form-control"
                       value={formik.bio}
                        autoComplete="off"
                        name="bio"
                      />
                    </div>
                    {formik.touched.bio && formik.errors.bio && (
                      <h6 style={{ color: "red" }}>{formik.errors.bio}</h6>
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
                    <br/>
                   
                  </form>
                </FormikProvider>
                <div className="m-t-20">
                      <button
                        className="btn btn-primary btn-md btn-block m-b-10 signupbtn"
                        type="submit"
                        onClick={()=>navigate("/")}
                      >
                        Back
                      </button>
                    </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

        </>
    )
};

export default UpdateUser;