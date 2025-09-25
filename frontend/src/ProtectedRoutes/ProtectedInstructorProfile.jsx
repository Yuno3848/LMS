import React from "react";
import { useSelector } from "react-redux";
import Loading from "../components/Loading";
import { Navigate } from "react-router";

const ProtectedInstructorProfile = ({ children }) => {
  const instructorProfile = useSelector(
    (state) => state.instructorProfile.profile
  );
  const loading = useSelector((state) => state.instructorProfile.loading);

  if (loading) {
    return <Loading />;
  }
  return !instructorProfile ? (
    children
  ) : (
    <Navigate to="/update-instructor-profile" />
  );
};

export default ProtectedInstructorProfile;
