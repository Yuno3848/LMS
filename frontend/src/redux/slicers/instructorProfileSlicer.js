import { createSlice } from "@reduxjs/toolkit";
let initialState;

const instructorProfileSlice = createSlice({
  name: "instructorProfile",
  initialState: {
    profile: null,
    loading: true,
  },
  reducers: {
    setCreateInstructorProfile: (state, action) => {
      state.profile = action.payload;
      state.loading = false;
    },

    setInstructorLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});
