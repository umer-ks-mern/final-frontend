import React from "react";
import "./sidebar.css";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  
  return (
    <>
      <div className="area" />
      <nav className="main-menu">
        <ul>
          <li>
            <a href="#">
              <i className="fa fa-home fa-2x" />
              <span className="nav-text">Home</span>
            </a>
          </li>
          <hr/>
          <li className="has-subnav">
            <Link to={"/explore"}>
              <i className="fa fa-globe fa-2x" />
              <span className="nav-text">Explore</span>
              </Link>
          </li>
          <hr/>
          <li className="has-subnav">
            <a href="#">
              <i className="fa fa-comments fa-2x" />
              <span className="nav-text">Messages</span>
            </a>
          </li>
          <hr/>
          <li className="has-subnav">
            <Link to={"/create-post"}>
              <i className="fa fa-camera-retro fa-2x" />
              <span className="nav-text">Create</span>
            </Link>
          </li>
          <hr/>
         
        
          <li>
            <a href="#">
              <i className="fa fa-book fa-2x" />
              <span className="nav-text">Notifications</span>
            </a>
          </li>
          <hr/>
          <li>
            <Link to={"/"}>
              <i className="fa fa-cogs fa-2x" />
              <span className="nav-text">Profile</span>
            </Link>
          </li>
         
        </ul>
        <ul className="logout">
          <li>
          <Link to={"/login"} onClick={()=>localStorage.removeItem("token")}>
              <i className="fa fa-power-off fa-2x" />
              <span className="nav-text">Logout</span>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Sidebar;
