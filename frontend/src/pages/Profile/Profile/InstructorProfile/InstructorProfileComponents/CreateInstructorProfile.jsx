import React, { useState } from "react";
import InstructorProfileForm from "../InstructorProfileFormPage";
import { instructorProfileAPIFetch } from "../../../../../ApiFetch/instructorProfileApiFetch";
import { useDispatch } from "react-redux";
import {
  setInstructorProfile,
  setInstructorLoading,
} from "../../../../../redux/slicers/instructorProfileSlicer";
import toast from "react-hot-toast";
import {
  setClearStudentProfile,
  setStudentLoading,
} from "../../../../../redux/slicers/studentProfileSlicer";
import { useNavigate } from "react-router";
const CreateInstructorProfile = () => {
  const [formData, setFormData] = useState({
    bio: "",
    expertise: "",
    socialLinks: {
      linkedin: "",
      twitter: "",
      facebook: "",
      instagram: "",
    },
    rating: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setInstructorLoading(true));
    dispatch(setStudentLoading(true));
    try {
      const result = await instructorProfileAPIFetch.createInstructorProfile(
        formData
      );

      if (result.success) {
        toast.success(result?.data?.message || "Instructor profile created");

        dispatch(setInstructorProfile(result?.data?.data));

        dispatch(setStudentLoading(false));

        navigate("/instructor-profile");
      } else {
        toast.error(result?.error || "Instructor Profile already exist");
      }
    } catch (error) {
      toast.error(error.message || "something went wrong");
    } finally {
      dispatch(setInstructorLoading(false));
      dispatch(setStudentLoading(false));
    }
  };

  return (
    <InstructorProfileForm
      title="Create Instructor Profile"
      formData={formData}
      setFormData={setFormData}
      handleSubmit={handleSubmit}
      submitLabel="Create Profile"
    />
  );
};

export default CreateInstructorProfile;
