import React, { useContext } from "react";

import { createBrowserRouter, Navigate } from "react-router";
import Home from "./src/pages/Home/Home";
import Login from "./src/pages/Login/Login";
import SignUp from "./src/pages/SignUp/SignUp";
import Profile from "./src/pages/Profile/Profile/Profile";
import UpdateProfile from "./src/pages/Profile/UpdateProfile";
import Course from "./src/pages/MainCourse/Course/Course";
import LayoutWithFooter from "./Layouts/LayoutWithFooter";
import LayoutWithoutFooter from "./Layouts/LayoutWithoutFooter";
import LayoutwithFooter_Header from "./Layouts/LayoutwithFooter_Header";
import HelpAndSupport from "./src/pages/HelpAndSupport/HelpAndSupport";
import EmailVerificationPage from "./src/pages/Profile/Profile/ProfilePages/EmailVerificationPage";
import ForgotPassword from "./src/pages/Password/ForgotPassword";
import ResetPassword from "./src/pages/Password/ResetPassword";

import CreateStudentProfile from "./src/pages/Profile/Profile/StudentProfile/SubStudentProfilePages/CreateStudentProfile";
import ProtectedRoute from "./src/ProtectedRoutes/ProtectedRoute";
import ProtectedStudentProfile from "./src/ProtectedRoutes/ProtectedStudentProfile";
import StudentProfilePage from "./src/pages/Profile/Profile/StudentProfile/SubStudentProfilePages/StudentProfilePage";
import UpdateStudentProfile from "./src/pages/Profile/Profile/StudentProfile/SubStudentProfilePages/UpdateStudentProfile";

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
      {
        path: "/create-student-profile",
        element: (
          <ProtectedRoute>
            <ProtectedStudentProfile>
              <CreateStudentProfile />
            </ProtectedStudentProfile>
          </ProtectedRoute>
        ),
      },
      {
        path: "/update-student-profile",
        element: (
          <ProtectedRoute>
            <UpdateStudentProfile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/student-profile",
        element: <StudentProfilePage />,
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
