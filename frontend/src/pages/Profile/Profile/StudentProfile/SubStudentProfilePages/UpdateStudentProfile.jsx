import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { Save } from "lucide-react";
import { studentProfileApiFetch } from "../../../../../ApiFetch/studentProfileApiFetch";
import { setStudentProfile } from "../../../../../redux/slicers/studentProfileSlicer";
import StudentProfileForm from "../StudentProfileForm"; // shared form component

const UpdateStudentProfile = () => {
  const dispatch = useDispatch();
  const studentProfile = useSelector((state) => state.studentProfile.profile);

  const [formData, setFormData] = useState({
    bio: "",
    skills: "",
    education: "",
    interests: "",
    socialLinks: { linkedin: "", twitter: "", facebook: "", instagram: "" },
  });

  useEffect(() => {
    if (studentProfile?.data) {
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
    }
  };

  return (
    <StudentProfileForm
      title="Update Student Profile"
      formData={formData}
      setFormData={setFormData}
      handleSubmit={handleSubmit}
      submitLabel="Update Profile"
      submitIcon={<Save className="w-5 h-5" />}
    />
  );
};

export default UpdateStudentProfile;
