import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { studentProfileApiFetch } from "../../../../../ApiFetch/studentProfileApiFetch";
import {
  setStudentLoading,
  setStudentProfile,
} from "../../../../../redux/slicers/studentProfileSlicer";
import StudentProfileForm from "../StudentProfileForm"; // shared form component
import Loading from "../../../../../components/Loading";
import { useNavigate } from "react-router";

const UpdateStudentProfile = () => {
  const dispatch = useDispatch();
  const studentProfile = useSelector((state) => state.studentProfile.profile);
  const isLoading = useSelector((state) => state.studentProfile.loading);

  const studentProfileData =
    (Array.isArray(studentProfile) && studentProfile[0]?.studentProfile) ||
    (studentProfile?.data &&
      Array.isArray(studentProfile.data) &&
      studentProfile.data[0]?.studentProfile) ||
    studentProfile ||
    {};

  const navigate = useNavigate();
  const { bio, skills, education, interests, socialLinks } = studentProfileData;

  const [formData, setFormData] = useState({
    bio: "",
    skills: "",
    education: "",
    interests: "",
    socialLinks: { linkedin: "", twitter: "", facebook: "", instagram: "" },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (studentProfile && Object.keys(studentProfileData).length > 0) {
      setFormData({
        bio: bio || "",
        skills: skills || "",
        education: education || "",
        interests: interests || "",
        socialLinks: {
          linkedin: socialLinks?.linkedin || "",
          facebook: socialLinks?.facebook || "",
          instagram: socialLinks?.instagram || "",
          twitter: socialLinks?.twitter || "",
        },
      });
    }
  }, [studentProfile, bio, skills, education, interests, socialLinks]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    dispatch(setStudentLoading(true));
    try {
      const result = await studentProfileApiFetch.updateStudentProfile(
        formData
      );
      if (result.success) {
        toast.success(result?.data?.message || "Profile updated successfully");
        dispatch(setStudentProfile(result?.data?.data));
        navigate("/student-profile");
      } else {
        toast.error(result?.error || "Failed to update profile");
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      dispatch(setStudentLoading(false));
    }
  };

  if (isLoading || !studentProfile) {
    return <Loading />;
  }

  return (
    <>
      <StudentProfileForm
        title="Update Student Profile"
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        submitLabel="Update Profile"
      />
    </>
  );
};

export default UpdateStudentProfile;
