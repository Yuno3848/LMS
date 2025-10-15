import React from "react";
import { Navigate } from "react-router";
import { useSelector } from "react-redux";
import Loading from "../components/Loading";

const ProtectedStudentProfile = ({ children }) => {
  const user = useSelector((state) => state.auth.user);
  const authLoading = useSelector((state) => state.auth.loading);
  const studentProfile = useSelector((state) => state.studentProfile.profile);
  const studentLoading = useSelector((state) => state.studentProfile.loading);

  if (authLoading || studentLoading) {
    return <Loading text="Loading your student profile..." />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const hasStudentProfile =
    studentProfile &&
    (Array.isArray(studentProfile.data)
      ? studentProfile.data.length > 0
      : studentProfile.data);

  if (hasStudentProfile) {
    return <Navigate to="/student-profile" replace />;
  }

  return <>{children}</>;
};

export default ProtectedStudentProfile;
