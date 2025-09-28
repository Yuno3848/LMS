import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { studentProfileApiFetch } from "../../../../../ApiFetch/studentProfileApiFetch";
import {
  setStudentLoading,
  setStudentProfile,
} from "../../../../../redux/slicers/studentProfileSlicer";
import StudentProfileForm from "../StudentProfileForm";
import { setClearInstructorProfile } from "../../../../../redux/slicers/instructorProfileSlicer";

const CreateStudentProfile = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.studentProfile.loading);

  const [formData, setFormData] = useState({
    bio: "",
    skills: "",
    education: "",
    interests: "",
    socialLinks: { linkedin: "", twitter: "", facebook: "", instagram: "" },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setStudentLoading(true));
    try {
      const result = await studentProfileApiFetch.createStudentProfile(
        formData
      );
      console.log("result create student profile:", result);
      if (result.success) {
        toast.success(result?.data?.message || "Profile created successfully");
        dispatch(setStudentProfile(result?.data?.data));
        
      } else {
        toast.error(result?.error || "You can't create more than one profile");
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      dispatch(setStudentLoading(false));
    }
  };

  return (
    <StudentProfileForm
      title="Create Student Profile"
      formData={formData}
      setFormData={setFormData}
      handleSubmit={handleSubmit}
      submitLabel="Create Profile"
      loading={loading}
    />
  );
};

export default CreateStudentProfile;
