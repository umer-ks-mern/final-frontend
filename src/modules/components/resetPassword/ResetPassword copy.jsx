import { Field, FormikProvider, useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import './resetPassword.css'

import axios from "axios";

import { useEffect, useState } from "react";


const ResetPass = () => {
const [emailSent, setEmailSent] = useState(false);
const [verified, setVerified]=useState(false);
const [email, setEmail] = useState("");
let emailFlag = false;
let otpFlag = false;


  const emailSchema = Yup.object({
    email: Yup.string()
      .required("Email is a required field")
      .email("Invalid email format")
   
  });

  const otpSchema = Yup.object({
   
    otp:Yup.string()
    .required("Check your mail & enter the OTP code")
    .min(4).max(4)
   });

  



  useEffect(()=>{emailFlag = !emailFlag
    console.log(emailFlag)}, [emailSent])

    useEffect(()=>{otpFlag = !otpFlag
        console.log(otpFlag)}, [verified])
            

  const formik = useFormik({
    initialValues: {
      email: "",
     
    },
    validationSchema: emailFlag? (otpFlag? passwordSchema: otpSchema): emailSchema,
    onSubmit: (values) => {
      console.log(values);
    if(emailFlag)
    confrimOtp({email: email, otp: values.otp});
    else
      generateOtp(values.email);
    },
  });

  const confrimOtp = async (data) => {
   
    await axios
      .post(`http://localhost:3300/otp`,data)
      .then((res) => {
          setVerified(true);

        console.log(res);
        console.log(verified);
      })
      .catch((err) =>{ 
        console.log(err)
      
    });
 
    };


  const generateOtp = async (email) => {
   setEmail(email)
    await axios
      .get(`http://localhost:3300/otp/${email}`)
      .then((res) => {
        console.log(res);
        // navigate("/");
        setEmailSent(true);
      
      })
      .catch((err) =>{ 
        console.log(err)
        
      
    });
 
    };

  return (
    <div>
      <img src="images/logoo.png" className="brand-logo text-center" />
      <FormikProvider value={formik}>
        {!emailSent &&
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

        <button type="button" onClick={formik.handleSubmit} className="code-btn">Send Code</button>
        </div>
        
          

      </form>
            
        }
        {emailSent && !verified &&
        <form className="w-100">
         
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
       {formik.touched.otp && formik.errors.otp && (
         <h6 style={{ color: "red" }}>{formik.errors.otp}</h6>
       )}
        </div>
        <div>

     <button type="button" onClick={formik.handleSubmit} className="code-btn">Verify Code</button>
     </div>
     
       

   </form>
            
        }
        {verified &&
        <form className="w-100">
         
        <div className="input-group">
       <span className="input-group-addon">
         <i className="icofont icofont-email"></i>
       </span>
       <Field
         type="password"
         name="password"
         placeholder="new-password"
         className="form-control"
         required
         autoComplete="off"
         />
       {formik.touched.password && formik.errors.password && (
         <h6 style={{ color: "red" }}>{formik.errors.password}</h6>
       )}
        </div>
        <div className="input-group">
       <span className="input-group-addon">
         <i className="icofont icofont-email"></i>
       </span>
       <Field
         type="password"
         name="confirmPassword"
         placeholder="confirmPassword"
         className="form-control"
         required
         autoComplete="off"
         />
       {formik.touched.confirmPassword && formik.errors.confirmPassword && (
         <h6 style={{ color: "red" }}>{formik.errors.confirmPassword}</h6>
       )}
        </div>
        <div>

     <button type="button" onClick={formik.handleSubmit} className="code-btn">Set Password</button>
     </div>
     
       

   </form>
            
        }
      </FormikProvider>
    </div>
  );
};
export default ResetPass;
