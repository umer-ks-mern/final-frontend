import React from "react";
import Login from '../modules/components/auth/Login/Login';
import SignUp from '../modules/components/auth/SignUp/SignUp';
import ResetPassword from '../modules/components/auth/resetPassword/ResetPassword';
import ConfirmOTP from '../modules/components/auth/confirmOtp/confrimOTP';
import SetPassword from '../modules/components/auth/setPassword/setPassword';
import RestrictedRoutes from "./restrict";

const nonLayoutRoutes=[
    {
        path:'/login',
        element:(
        <RestrictedRoutes>
        <Login/>
        </RestrictedRoutes>
        )
    },
    {
        path:'/signup',
        element:(
            <RestrictedRoutes>
            <SignUp/>
            </RestrictedRoutes>
            )
    }, 
    {
        path:'/reset-password',
        element:(
            <RestrictedRoutes>
            <ResetPassword/>
            </RestrictedRoutes>
            )
    }, 
    {
        path:'/confirm-otp',
        element:(
            <RestrictedRoutes>
            <ConfirmOTP/>
            </RestrictedRoutes>
            )
    }, 
    {
        path:'/setPass',
        element:<SetPassword/>
    }, 
];

export default nonLayoutRoutes;