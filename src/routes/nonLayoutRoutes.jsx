import React from "react";
import Login from '../modules/components/auth/Login/Login';
import SignUp from '../modules/components/auth/SignUp/SignUp';
import ResetPassword from '../modules/components/auth/resetPassword/ResetPassword';
import ConfirmOTP from '../modules/components/auth/confirmOtp/confrimOTP';
import SetPassword from '../modules/components/auth/setPassword/setPassword';

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