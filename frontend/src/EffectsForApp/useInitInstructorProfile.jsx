import React from "react";
import { authApi } from "../ApiFetch/authApiFetch";
import { useDispatch, useSelector } from "react-redux";
import {
  setClearInstructorProfile,
  setInstructorLoading,
  setInstructorProfile,
} from "../redux/slicers/instructorProfileSlicer";
import { logout } from "../redux/slicers/authSlicer";

const useInitInstructorProfile = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchInstructorProfile = async () => {
      try {
        const result = await authApi.getInstructorProfile();
        if (result.success) {
          dispatch(setInstructorProfile(result?.data));
        } else {
          dispatch(setClearInstructorProfile());
        }
      } catch (error) {
        dispatch(logout());
        dispatch(setClearInstructorProfile());
      } finally {
        dispatch(setInstructorLoading(false));
      }
    };
    fetchInstructorProfile();
  }, [dispatch]);
};

export default useInitInstructorProfile;
