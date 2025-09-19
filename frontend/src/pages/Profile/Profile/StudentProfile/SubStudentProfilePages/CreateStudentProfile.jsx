import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { Save } from "lucide-react";
import { studentProfileApiFetch } from "../../../../../ApiFetch/studentProfileApiFetch";
import { setStudentProfile } from "../../../../../redux/slicers/studentProfileSlicer";
import StudentProfileForm from "../StudentProfileForm";

const CreateStudentProfile = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    bio: "",
    skills: "",
    education: "",
    interests: "",
    socialLinks: { linkedin: "", twitter: "", facebook: "", instagram: "" },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await studentProfileApiFetch.createStudentProfile(
        formData
      );
         console.log("result create student profile:",result)
      if (result.success) {
        toast.success(result?.data?.message || "Profile created successfully");
        
        dispatch(setStudentProfile(result?.data?.data));
      } else {
        toast.error(result?.error || "Failed to create profile");
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  return (
    <StudentProfileForm
      title="Create Student Profile"
      formData={formData}
      setFormData={setFormData}
      handleSubmit={handleSubmit}
      submitLabel="Create Profile"
      submitIcon={<Save className="w-5 h-5" />}
    />
  );
};

export default CreateStudentProfile;
