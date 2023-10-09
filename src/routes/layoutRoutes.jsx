import React from "react";
import UserProfile from "../modules/pages/profile/UserProfile";

import PrivateRoute from "./privateRoutes";
import UpdateUser from "../modules/pages/update/Update";
import InstagramMessageUI from "../modules/pages/messages/messages";

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
    path: "/messages",
    element: (
      <PrivateRoute>
      <InstagramMessageUI/>
      </PrivateRoute>
    ),
  },
  {
    path: "/update-user",
    element: (
      <PrivateRoute>
      <UpdateUser/>
      </PrivateRoute>
    ),
  }
];

export default layoutRoutes;
