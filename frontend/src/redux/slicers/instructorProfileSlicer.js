import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  profile: null,
  loading: true,
};

const instructorProfileSlice = createSlice({
  name: "instructorProfile",
  initialState,
  reducers: {
    setInstructorProfile: (state, action) => {
      state.profile = action.payload;
      state.loading = false;
    },

    setInstructorLoading: (state, action) => {
      state.loading = action.payload;
      state.loading = false;
    },

    setClearInstructorProfile: () => ({ ...initialState }),
    addInstructorCourse: (state, action) => {
      if (state.profile) {
        if (!state.profile.courses) {
          state.profile.courses = [];
        }
        state.profile.courses.push(action.payload);
      }
    },
  },
});

export const {
  setInstructorProfile,
  setInstructorLoading,
  setClearInstructorProfile,
  addInstructorCourse,
} = instructorProfileSlice.actions;

export default instructorProfileSlice.reducer;
