import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import {
  setStudentLoading,
  setStudentProfile,
} from "../redux/slicers/studentProfileSlicer";
import { logout } from "../redux/slicers/authSlicer";
import { studentProfileApiFetch } from "../ApiFetch/studentProfileApiFetch";

const useInitStudentProfile = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await studentProfileApiFetch.getStudentProfile();

        if (result.success) {
          "useInitStudentProfile :", result;
          dispatch(setStudentProfile(result?.data?.data));
        } else {
          dispatch(setStudentProfile(null));
        }
      } catch (error) {
        dispatch(logout());
        dispatch(setStudentProfile(null));
      } finally {
        dispatch(setStudentLoading(false));
      }
    };
    fetchUser();
  }, [dispatch]);
};

export default useInitStudentProfile;
