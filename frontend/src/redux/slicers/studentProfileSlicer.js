import { createSlice } from "@reduxjs/toolkit";

const studentProfileSlice = createSlice({
  name: "studentProfile",
  initialState: { profile: null, loading: true },
  reducers: {
    setStudentProfile: (state, action) => {
      state.profile = action.payload;
      state.loading = false;
    },
    setStudentLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});
export const { setStudentProfile, setStudentLoading } =
  studentProfileSlice.actions;
export default studentProfileSlice.reducer;
