import React, { useState } from "react";
import InstructorProfileForm from "../InstructorProfileFormPage";
import { instructorProfileAPIFetch } from "../../../../../ApiFetch/instructorProfileApiFetch";
import { useDispatch, useSelector } from "react-redux";
import {
  setCreateInstructorProfile,
  setInstructorLoading,
} from "../../../../../redux/slicers/instructorProfileSlicer";
import toast from "react-hot-toast";
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setInstructorLoading(true));
    try {
      const result = await instructorProfileAPIFetch.createInstructorProfile(
        formData
      );
      console.log("instructor result :", result);
      if (result.success) {
        toast.success("Instructor profile created");
        dispatch(setCreateInstructorProfile(formData));
      }
    } catch (error) {
      toast.error(error.message || "Instructor profile already exists");
    } finally {
      dispatch(setInstructorLoading(false));
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
