import React from "react";
import Login from "../modules/components/Login/Login";
import SignUp from "../modules/components/SignUp/SignUp";
import ResetPassword from "../modules/components/resetPassword/ResetPassword";
import SetPassword from "../modules/components/auth/setPassword/setPassword";
import ConfirmOTP from "../modules/components/confirmOtp/confrimOTP";


const nonLayoutRoutes=[
    {
        path:'/login',
        element:<Login/>
    },
    {
        path:'/signup',
        element:<SignUp/>
    }, 
    {
        path:'/reset-password',
        element:<ResetPassword/>
    }, 
    {
        path:'/confirm-otp',
        element:<ConfirmOTP/>
    }, 
    {
        path:'/setPass',
        element:<SetPassword/>
    }, 
];

export default nonLayoutRoutes;