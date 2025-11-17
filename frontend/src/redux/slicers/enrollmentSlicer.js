import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  myCourse: [],
  detailedCourse: [],
  loading: true,
};
const enrollmentSlice = createSlice({
  name: "enrolledCourse",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setEnrolledCourse: (state, action) => {
      state.myCourse = action.payload;
      state.loading = false;
    },

    addEnrolledCourse: (state, action) => {
      const newCourse = Array.isArray(action.payload)
        ? action.payload
        : [action.payload];

      state.myCourse = [...state.myCourse, ...newCourse];

      state.loading = false;
    },

    setClearEnrolled: () => ({ ...initialState }),

    setDetailedEnrolled: (state, action) => {
      state.detailedCourse = action.payload;
      state.loading = false;
    },
  },
});
export const {
  setLoading,
  setEnrolledCourse,
  addEnrolledCourse,
  setClearEnrolled,
  setDetailedEnrolled,
} = enrollmentSlice.actions;
export default enrollmentSlice.reducer;
