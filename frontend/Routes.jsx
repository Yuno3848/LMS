import React, { useContext } from "react";

import { createBrowserRouter, Navigate } from "react-router";
import Home from "./src/pages/Home/Home";
import Login from "./src/pages/Login/Login";
import SignUp from "./src/pages/SignUp/SignUp";
import Profile from "./src/pages/Profile/Profile/Profile";
import UpdateProfile from "./src/pages/Profile/UpdateProfile";
import Course from "./src/pages/MainCourse/Course/Course";
import { useSelector } from "react-redux";
import LayoutWithFooter from "./Layouts/LayoutWithFooter";
import LayoutWithoutFooter from "./Layouts/LayoutWithoutFooter";
import LayoutwithFooter_Header from "./Layouts/LayoutwithFooter_Header";
import HelpAndSupport from "./src/pages/HelpAndSupport/HelpAndSupport";
import EmailVerificationPage from "./src/pages/Profile/Profile/ProfilePages/EmailVerificationPage";
import StudentProfile from "./src/pages/Profile/Profile/StudentProfile/StudentProfile";
import ForgotPassword from "./src/pages/Password/ForgotPassword";
import ResetPassword from "./src/pages/Password/ResetPassword";
import UpdateStudentProfile from "./src/pages/Profile/Profile/StudentProfile/UpdateStudentProfile";
import Loading from "./src/components/Loading";

const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading);
  if (loading) {
    return <Loading />;
  }
  return user ? children : <Navigate to="/login" />;
};
export const Routes = createBrowserRouter([
  {
    element: <LayoutWithFooter />,
    children: [
      {
        path: "/",
        element: <Home />,
      },

      {
        path: "/course",
        element: (
          <ProtectedRoute>
            <Course />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    element: <LayoutwithFooter_Header />,
    children: [
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/update-profile",
        element: (
          <ProtectedRoute>
            <UpdateProfile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/help",
        element: (
          <ProtectedRoute>
            <HelpAndSupport />
          </ProtectedRoute>
        ),
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
    ],
  },
  {
    path: "/reset-password/:token",
    element: <ResetPassword />,
  },
  {
    path: "/verify-email/:token",
    element: <EmailVerificationPage />,
  },
  {
    element: <LayoutWithoutFooter />,
    children: [
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },

  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);
export default Routes;
