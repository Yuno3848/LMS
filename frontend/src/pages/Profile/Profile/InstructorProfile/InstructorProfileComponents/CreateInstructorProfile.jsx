import React, { useState } from "react";
import InstructorProfileForm from "../InstructorProfileFormPage";

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await instructorProfileAPIFetch.createInstructorProfile(
        formData
      );

      if (result.success) {
        toast.success("Instructor profile created");
      }
    } catch (error) {
      toast.error(error.message || "Instructor profile already exists");
    } finally {
    }
  };

  return (
    <InstructorProfileForm
      title="Create Instructor Profile"
      formData={formData}
      setFormData={setFormData}
      handleSubmit={handleSubmit}
      submitLabel="Instructor Profile"
    />
  );
};

export default CreateInstructorProfile;
