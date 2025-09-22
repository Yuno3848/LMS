import { createSlice } from "@reduxjs/toolkit";
let initialState;
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
    setClearStudentProfile: () => initialState,
  },
});
export const { setStudentProfile, setStudentLoading, setClearStudentProfile } =
  studentProfileSlice.actions;
export default studentProfileSlice.reducer;
