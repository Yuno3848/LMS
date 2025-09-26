import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  profile: null,
  loading: false,
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
    },

    setClearInstructorProfile: () => ({ ...initialState }),
  },
});

export const {
  setInstructorProfile,
  setInstructorLoading,
  setClearInstructorProfile,
} = instructorProfileSlice.actions;

export default instructorProfileSlice.reducer;
