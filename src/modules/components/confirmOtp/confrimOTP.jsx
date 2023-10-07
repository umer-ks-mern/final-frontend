import { Field, FormikProvider, useFormik } from "formik";
import React, { useEffect } from "react";
import * as Yup from "yup";
import './confirmOTP.css'

import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";


const ConfirmOTP = () => {
  const navigate=useNavigate();
  const email = useSelector((state)=> state.auth.email)
  const schema = Yup.object({
    email: Yup.string(),
  
   otp:Yup.string()
   .required("enter code")
   .min(4).max(4)
  });

  const formik = useFormik({
    initialValues: {
    email:"",
     otp:""
    },
    validationSchema: schema,
    onSubmit: (values) => {
      console.log(values);
      handleOTP({email:email,otp:values.otp});
    },
  });
useEffect(()=>{
  
 formik.resetForm({email:email,otp:""})
},[email]);

  const handleOTP = async (data) => {
   
    await axios
      .post(`http://localhost:3300/otp`,data)
      .then((res) => {
        toast.success("OTP verified!")
        console.log(res);
        navigate("/setPass");
      
      })
      .catch((err) =>{ 
        toast.error("Error occured")
        console.log(err)
      
    });
 
    };
useEffect(()=> console.log(email),[])
  return (
    <div>
      <img src="/images/logoo.png" className="brand-logo text-center" />
      <FormikProvider value={formik}>
        <form className="w-100">
        <div className="input-group">
          <span className="input-group-addon">
            <i className="icofont icofont-email"></i>
          </span>
          <Field
            type="email"
            name="email"
            
            className="form-control"
           value={email}
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
              type="otp"
              name="otp"
              placeholder="otp-code"
              className="form-control"
              required
              autoComplete="off"
              />
           
             </div>
             {formik.touched.otp && formik.errors.otp && (
              <h6 style={{ color: "red" }}>{formik.errors.otp}</h6>
            )}
             <div>

          <button type="button" className="code-btn"><Link to={"/reset-password"}>Back</Link></button>
          <button type="button" onClick={formik.handleSubmit} className="code-btn">Verify Code</button>
          </div>
          
            
 
        </form>
      </FormikProvider>
    </div>
  );
};
export default ConfirmOTP;
