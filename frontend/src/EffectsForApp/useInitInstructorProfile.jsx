import { authApi } from "../ApiFetch/authApiFetch";
import { useDispatch, useSelector } from "react-redux";
import {
  setClearInstructorProfile,
  setInstructorLoading,
  setInstructorProfile,
} from "../redux/slicers/instructorProfileSlicer";
import { logout } from "../redux/slicers/authSlicer";
import { instructorProfileAPIFetch } from "../ApiFetch/instructorProfileApiFetch";
import { useEffect } from "react";

const useInitInstructorProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (!user) return;

    const fetchInstructorProfile = async () => {
      try {
        const result = await instructorProfileAPIFetch.getInstructorProfile();

        if (result.success) {
          dispatch(setInstructorProfile(result?.data?.data));
        } else {
          dispatch(setClearInstructorProfile());
        }
      } catch (error) {
        dispatch(setClearInstructorProfile());
      } finally {
        dispatch(setInstructorLoading(false));
      }
    };

    fetchInstructorProfile();
  }, [dispatch, user]);
};

export default useInitInstructorProfile;
