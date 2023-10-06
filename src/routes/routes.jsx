import React from "react";
import UserProfile from "../modules/pages/profile/UserProfile";
import Post from "../modules/components/Post";
import ConfirmOTP from "../modules/components/confirmOtp/confrimOTP";

const routes=[
    {
        path:"user-profile",
        element:<UserProfile/>
    },
    {
        path:"/create-post",
        element:<Post/>
    }, 
 
];

export default routes;