import React, { useContext } from "react";

import { createBrowserRouter, Navigate } from "react-router";
import Home from "./src/pages/Home/Home";
import Login from "./src/pages/Login/Login";
import SignUp from "./src/pages/SignUp/SignUp";
import Profile from "./src/pages/Profile/Profile";
import UpdateProfile from "./src/pages/Profile/UpdateProfile";
import Course from "./src/pages/MainCourse/Course/Course";
import { useSelector } from "react-redux";
const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.auth.user);
  return user ? children : <Navigate to="/login" />;
};
export const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "signup",
    element: <SignUp />,
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    ),
  },
  {
    path: "/updateprofile",
    element: (
      <ProtectedRoute>
        <UpdateProfile />
      </ProtectedRoute>
    ),
  },
  {
    path: "/course",
    element: (
      <ProtectedRoute>
        <Course />
      </ProtectedRoute>
    ),
  },
]);
export default routes;
