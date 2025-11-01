import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { courseApiFetch } from "../ApiFetch/courseApiFetch";
import { setCourses, setLoading } from "../redux/slicers/courseSlicer";

const useInitInstructorCourses = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (!user) return;

    const fetchInstructorCourses = async () => {
      dispatch(setLoading(true));

      try {
        const result = await courseApiFetch.getCourseByInstructorId();

        if (result.success && result?.data?.data) {
          
          dispatch(setCourses(result.data.data));
        } else {
          dispatch(setCourses([]));
        }
      } catch (error) {
        console.error("Failed to fetch instructor courses:", error);
        dispatch(setCourses([]));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchInstructorCourses();
  }, [dispatch, user]);
};

export default useInitInstructorCourses;
