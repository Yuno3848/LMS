import React, { useEffect, useState } from "react";
import InstructorProfileForm from "../InstructorProfileFormPage";
import { instructorProfileAPIFetch } from "../../../../../ApiFetch/instructorProfileApiFetch";
import { useDispatch, useSelector } from "react-redux";
import {
  setInstructorProfile,
  setInstructorLoading,
} from "../../../../../redux/slicers/instructorProfileSlicer";
import toast from "react-hot-toast";
const UpdateInstructorProfile = () => {
  const instructorProfile = useSelector(
    (state) => state.instructorProfile.profile
  );
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

  useEffect(() => {
    if (instructorProfile) {
      setFormData({
        bio: instructorProfile?.bio || "",
        expertise: instructorProfile?.expertise || "",
        socialLinks: {
          linkedin: instructorProfile?.socialLinks?.linkedin || "",
          twitter: instructorProfile?.socialLinks?.twitter || "",
          facebook: instructorProfile?.socialLinks?.facebook || "",
          instagram: instructorProfile?.socialLinks?.instagram || "",
        },
        rating: instructorProfile?.rating || 0,
      });
    }
  }, [instructorProfile]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setInstructorLoading(true));
    try {
      const result = await instructorProfileAPIFetch.updateInstructorProfile(
        formData
      );
      console.log("updated result instructorProfile :", result);
      if (result.success) {
        toast.success(result?.data?.message || "Instructor profile updated");
        dispatch(setInstructorProfile(result?.data?.data));
      } else {
        toast.error(result?.error || "Instructor profile not updated");
      }
    } catch (error) {
      toast.error(error.message || "something went wrong");
    } finally {
      dispatch(setInstructorLoading(false));
    }
  };

  return (
    <InstructorProfileForm
      title="Update Instructor Profile"
      formData={formData}
      setFormData={setFormData}
      handleSubmit={handleSubmit}
      submitLabel="Update Profile"
    />
  );
};

export default UpdateInstructorProfile;
