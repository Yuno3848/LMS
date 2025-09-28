import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { Save } from "lucide-react";
import { studentProfileApiFetch } from "../../../../../ApiFetch/studentProfileApiFetch";
import {
  setStudentLoading,
  setStudentProfile,
} from "../../../../../redux/slicers/studentProfileSlicer";
import StudentProfileForm from "../StudentProfileForm"; // shared form component

const UpdateStudentProfile = () => {
  const dispatch = useDispatch();
  const studentProfile = useSelector((state) => state.studentProfile.profile);
  console.log("student Profile update student profile :", studentProfile);
  const loading = useSelector((state) => state.studentProfile.loading);
  const [formData, setFormData] = useState({
    bio: "",
    skills: "",
    education: "",
    interests: "",
    socialLinks: { linkedin: "", twitter: "", facebook: "", instagram: "" },
  });

  useEffect(() => {
    if (studentProfile) {
      setFormData({
        bio: studentProfile.bio || "",
        skills: studentProfile.skills || "",
        education: studentProfile.education || "",
        interests: studentProfile.interests || "",
        socialLinks: {
          linkedin: studentProfile.socialLinks?.linkedin || "",
          twitter: studentProfile.socialLinks?.twitter || "",
          facebook: studentProfile.socialLinks?.facebook || "",
          instagram: studentProfile.socialLinks?.instagram || "",
        },
      });
    }
  }, [studentProfile]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setStudentLoading(true));
    try {
      const result = await studentProfileApiFetch.updateStudentProfile(
        formData
      );
      if (result.success) {
        toast.success(result?.data?.message || "Profile updated successfully");
        dispatch(setStudentProfile(result?.data?.data));
      } else {
        toast.error(result?.error || "Failed to update profile");
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      dispatch(setStudentLoading(false));
    }
  };

  return (
    <StudentProfileForm
      title="Update Student Profile"
      formData={formData}
      setFormData={setFormData}
      handleSubmit={handleSubmit}
      submitLabel="Update Profile"
      loading={loading}
    />
  );
};

export default UpdateStudentProfile;
