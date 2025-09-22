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
        
    } catch (error) {
        
    }finally{
        
    }
  };

  return (
    <InstructorProfileForm
      formData={formData}
      setFormData={setFormData}
      handleSubmit={handleSubmit}
    />
  );
};

export default CreateInstructorProfile;
