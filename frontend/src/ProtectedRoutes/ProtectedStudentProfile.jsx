import React from "react";
import { useSelector } from "react-redux";
import Loading from "../components/Loading";
import { Navigate } from "react-router";

const ProtectedStudentProfile = ({ children }) => {
  const studentProfile = useSelector((state) => state.studentProfile.profile);
  const studentLoading = useSelector((state) => state.studentProfile.loading);

  if (studentLoading) {
    return <Loading />;
  }
  return !studentProfile ? children : <Navigate to="/update-student-profile" />;
};

export default ProtectedStudentProfile;
