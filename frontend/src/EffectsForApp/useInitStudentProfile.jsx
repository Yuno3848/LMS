import React from "react";
import { useDispatch } from "react-redux";
import { authApi } from "../ApiFetch/authApiFetch";
import { setStudentProfile } from "../redux/slicers/studentProfileSlicer";

const useInitStudentProfile = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await authApi.getStudentProfileById();
        console.log("app jsx", result);
        if (result.success) {
          dispatch(setStudentProfile(result.data));
        }
      } catch (error) {
        dispatch(logout());
      }
    };
    fetchUser();
  }, [dispatch]);
};

export default useInitStudentProfile;
