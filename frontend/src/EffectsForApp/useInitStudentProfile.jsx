import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  setStudentLoading,
  setStudentProfile,
} from "../redux/slicers/studentProfileSlicer";
import { studentProfileApiFetch } from "../ApiFetch/studentProfileApiFetch";

const useInitStudentProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (!user) {
      dispatch(setStudentProfile(null));
      dispatch(setStudentLoading(false));
      return;
    }

    const fetchStudentProfile = async () => {
      dispatch(setStudentLoading(true));

      try {
        const result = await studentProfileApiFetch.getStudentProfile();

        if (result.success) {
          console.log("useInitStudentProfile:", result);
          dispatch(setStudentProfile(result?.data?.data));
        } else {
          dispatch(setStudentProfile(null));
        }
      } catch (error) {
        console.error("Error fetching student profile:", error);
        dispatch(setStudentProfile(null));
      } finally {
        dispatch(setStudentLoading(false));
      }
    };

    fetchStudentProfile();
  }, [dispatch, user]);
};

export default useInitStudentProfile;
