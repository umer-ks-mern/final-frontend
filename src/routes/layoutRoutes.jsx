import React from "react";
import UserProfile from "../modules/pages/profile/UserProfile";

import PrivateRoute from "./privateRoutes";
import UpdateUser from "../modules/pages/update/Update";
import InstagramMessageUI from "../modules/pages/messages/messages";
import UpdateProfilePicture from "../modules/pages/update/UpdateProfileImage";
import CreatePost from "../modules/components/auth/CreatePost/CreatePost";
import Post from "../modules/pages/post/Post";
import Comments from "../modules/pages/comments/Comments";
import Likes from "../modules/pages/likes/Likes";

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
        <InstagramMessageUI />
      </PrivateRoute>
    ),
  },
  {
    path: "/update-user",
    element: (
      <PrivateRoute>
        <UpdateUser />
      </PrivateRoute>
    ),
  },
  {
    path: "/update-profile-picture",
    element: (
      <PrivateRoute>
        <UpdateProfilePicture />
      </PrivateRoute>
    ),
  },
  {
    path: "/create-post",
    element: (
      <PrivateRoute>
        <CreatePost />
      </PrivateRoute>
    ),
  },
  {
    path: "/post/:postId",
    element: (
      <PrivateRoute>
        <Post />
      </PrivateRoute>
    ),
  },
  {
    path: "/post/comments/:postId",
    element: (
      <PrivateRoute>
        <Comments />
      </PrivateRoute>
    ),
  },
  {
    path: "/post/likes/:postId",
    element: (
      <PrivateRoute>
        <Likes />
      </PrivateRoute>
    ),
  },
];

export default layoutRoutes;
