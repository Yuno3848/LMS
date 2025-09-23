import { createSlice } from "@reduxjs/toolkit";
let initialState;

const instructorProfileSlice = createSlice({
  name: "instructorProfile",
  initialState: {
    profile: null,
    loading: true,
  },
  reducers: {
    setInstructorProfile: (state, action) => {
      state.profile = action.payload;
      state.loading = false;
    },

    setInstructorLoading: (state, action) => {
      state.loading = action.payload;
    },

    setClearInstructorProfile: () => initialState,
  },
});

export const {
  setInstructorProfile,
  setInstructorLoading,
  setClearInstructorProfile,
} = instructorProfileSlice.actions;

export default instructorProfileSlice.reducer;
