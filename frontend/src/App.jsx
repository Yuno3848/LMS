import React from "react";
import { RouterProvider } from "react-router";
import { useSelector } from "react-redux";
import Routes from "../Routes";
import Loading from "./components/Loading";
import useInitStudentProfile from "./EffectsForApp/useInitStudentProfile";
import useInitInstructorProfile from "./EffectsForApp/useInitInstructorProfile";
import useInitAuth from "./EffectsForApp/useInitAuth";
import useInitInstructorCourses from "./EffectsForApp/useInitInstructorCourses";
function App() {
  useInitAuth();

  useInitInstructorCourses();
  useInitStudentProfile();
  useInitInstructorProfile();

  const authLoading = useSelector((state) => state.auth.loading);
  const user = useSelector((state) => state.auth.user);
  const studentLoading = useSelector((state) => state.studentProfile.loading);
  const instructorLoading = useSelector(
    (state) => state.instructorProfile.loading
  );

  if (authLoading) {
    return <Loading text="Initializing your session..." />;
  }

  if (user && (studentLoading || instructorLoading)) {
    return <Loading text="Loading your profile..." />;
  }

  return <RouterProvider router={Routes} />;
}

export default App;
