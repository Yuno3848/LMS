import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: null,
  loading: false, 
};

const studentProfileSlice = createSlice({
  name: "studentProfile",
  initialState,
  reducers: {
    setStudentProfile: (state, action) => {
      state.profile = action.payload;
      state.loading = false; // ensure loading is stopped when profile is set
    },
    setStudentLoading: (state, action) => {
      state.loading = action.payload;
    },
    setClearStudentProfile: () => ({ ...initialState }),
  },
});

export const { setStudentProfile, setStudentLoading, setClearStudentProfile } =
  studentProfileSlice.actions;

export default studentProfileSlice.reducer;
