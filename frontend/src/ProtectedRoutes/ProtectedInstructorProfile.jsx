import React from "react";
import { Navigate } from "react-router";
import { useSelector } from "react-redux";
import Loading from "../components/Loading";

const ProtectedInstructorProfile = ({ children }) => {
  const { user, loading: authLoading } = useSelector((state) => state.auth);
  const { profile: instructorProfile, loading: instructorLoading } =
    useSelector((state) => state.instructorProfile);

  const sections = useSelector((state) => state.itemCourse);


  if (authLoading || instructorLoading) {
    return <Loading text="Loading your instructor profile..." />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!instructorProfile && !item ) {
    return <Navigate to="/create-instructor-profile" replace />;
  }

  return <>{children}</>;
};

export default ProtectedInstructorProfile;
