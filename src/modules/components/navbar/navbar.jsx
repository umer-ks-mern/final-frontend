import React from "react";
import './navbar.css';
import { FormikProvider, useFormik,Field } from "formik";
import * as Yup from 'yup';
import axios from "axios";
import { baseUrl } from "../../../App";

const Navbar=()=>{
    const schema = Yup.object({
     search:Yup.string().required("nothing searched!")
      });
    
      const formik = useFormik({
        initialValues: {
          search:""
        },
        validationSchema: schema,
        onSubmit: (values) => {
         handleSearch(values);
        },
      });
    
      const handleSearch = async (search) => {
       
        await axios
          .get(`${baseUrl}/users/${search}`)
          .then((res) => {
            console.log(res.data);
           
          })
          .catch((err) => {
            toast.error("Nothing Found!");
          
          })
      };
    return(
        <>
        <nav className="navbar fixed-top navbar-light bg-light">
            <img src="images/insta_logo.png" className="icon"/>
          
        <FormikProvider value={formik}>    
        <form>   
        <span>     
        <Field type="text" placeholder="search for people and posts....." name="search" className="search-bar"/>
        <img src="images/glass.png" className="glass" onClick={formik.handleSubmit}/>
        </span>
        </form>
        </FormikProvider>
    </nav>
        </>
    )
};
export default Navbar;