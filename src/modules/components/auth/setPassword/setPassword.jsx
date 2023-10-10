import React from "react";
import { useFormik ,FormikProvider,Field} from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { baseUrl } from "../../../../App";


const SetPassword=()=>{
  const email = useSelector((state)=> state.auth.email)
    const navigate=useNavigate();
    const passwordSchema = Yup.object({
        password: Yup.string()
          .required("*Required")
          .min(8),
          confirmPassword: Yup.string().when('password', (password, field) =>
          password ? field.required("Must be Same as New-Password").oneOf([Yup.ref('password')]) : field
        ),
       
      });
      const formik = useFormik({
        initialValues: {
         password:"",
         confirmPassword:""
        },
        validationSchema: passwordSchema,
        onSubmit: (values) => {
        handleNewPassword({email:email,password:values.password});
        },
      });

const handleNewPassword=(data)=>{
    axios.post(`${baseUrl}/resetpass`,data).then((res)=>{
      toast.success("Password Updated!");
        console.log(res);
    }).catch((err)=>{
      toast.error("Error occured!");
        console.log(err);
    })

    navigate("/login");
}

    return(
     <>
     <div>
      <img src="/images/logoo.png" className="brand-logo text-center" />
      <FormikProvider value={formik}>
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
      
        </div>
        {formik.touched.password && formik.errors.password && (
         <h6 style={{ color: "red" }}>{formik.errors.password}</h6>
       )}
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
      
        </div>
        {formik.touched.confirmPassword && formik.errors.confirmPassword && (
         <h6 style={{ color: "red" }}>{formik.errors.confirmPassword}</h6>
       )}
        <div>

     <button type="button" onClick={formik.handleSubmit} className="code-btn">Set Password</button>
     </div>
          
            
 
        </form>
      </FormikProvider>
    </div></>
    )
};

export default SetPassword;