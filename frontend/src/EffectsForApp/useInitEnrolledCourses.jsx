import React from "react";
import { useEffect } from "react";
import enrolledApiFetch from "../ApiFetch/enrolledApiFetch";
import { useDispatch } from "react-redux";
import {
  setEnrolledCourse,
  setLoading,
} from "../redux/slicers/enrollmentSlicer";

const useInitEnrolledCourses = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const enrolledCourse = async () => {
      try {
        const res = await enrolledApiFetch.getUserEnrollment();
        if (res?.success) {
          console.log("get-user-enrolled :", res);
          dispatch(setEnrolledCourse(res?.data?.data?.courseIds));
        } else {
          dispatch(setClearEnrolled());
        }
      } catch (error) {
        dispatch(setClearEnrolled());
      } finally {
        dispatch(setLoading(false));
      }
    };
    enrolledCourse();
  }, []);
};

export default useInitEnrolledCourses;
