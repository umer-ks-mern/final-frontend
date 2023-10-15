import React from "react";

import Sidebar from "../modules/components/sidebar/sidebar";
import { Outlet } from "react-router-dom";
import NavBar from "../modules/components/navbar/navbar";


const Layout=()=>{
    return(
    <>
        <NavBar/>
        <Sidebar/>
        <Outlet/>
    </>
       
    )
}

export default Layout;