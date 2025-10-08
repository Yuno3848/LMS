import { createSlice } from "@reduxjs/toolkit";

const courseSlice = createSlice({
  name: "course",
  initialState: {
    instructorCourses: [],
    loading: false,
  },
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setCourses: (state, action) => {
      state.instructorCourses = action.payload;
      state.loading = false;
    },
    addCourse: (state, action) => {
      state.instructorCourses.push(action.payload);
      state.loading = false;
    },
    deleteCourse: (state, action) => {
      state.instructorCourses = state.instructorCourses.filter(
        (course) => course.id !== action.payload
      );
      state.loading = false;
    },
    clearCourses: (state) => {
      state.instructorCourses = [];
      state.loading = false;
    },
  },
});

export const { setLoading, setCourses, addCourse, deleteCourse, clearCourses } =
  courseSlice.actions;

export default courseSlice.reducer;
