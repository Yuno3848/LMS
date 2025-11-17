import React from "react";
import { useEffect } from "react";
import enrolledApiFetch from "../ApiFetch/enrolledApiFetch";
import { useDispatch } from "react-redux";
import {
  setClearEnrolled,
  setDetailedEnrolled,
  setEnrolledCourse,
  setLoading,
} from "../redux/slicers/enrollmentSlicer";

const useInitDetailedEnrolledCourses = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const enrolledCourse = async () => {
      try {
        const res = await enrolledApiFetch.getDetailedUserEnrollments();
        if (res?.success) {
          console.log("get-user-enrolled :", res);
          dispatch(setDetailedEnrolled(res?.data?.data));
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

export default useInitDetailedEnrolledCourses;
