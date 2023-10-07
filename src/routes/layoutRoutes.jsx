import React from "react";
import UserProfile from "../modules/pages/profile/UserProfile";
import Post from "../modules/components/Post";
import PrivateRoute from "./privateRoutes";

const layoutRoutes = [
  {
    path: "/",
    element: (
      <PrivateRoute>
        <UserProfile />
      </PrivateRoute>
    ),
  },
  {
    path: "/create-post",
    element: (
      <PrivateRoute>
        <Post />
      </PrivateRoute>
    ),
  },
];

export default layoutRoutes;
