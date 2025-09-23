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

      if (result.success) {
        toast.success("Instructor profile created");
        dispatch(setCreateInstructorProfile(formData));
      } else {
        toast.error("Instructor Profile already exist");
      }
    } catch (error) {
      toast.error(error.message || "something went wrong");
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

export default CreateInstructorProfile;
