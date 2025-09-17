import { createSlice } from "@reduxjs/toolkit";

const studentProfileSlice = createSlice({
  name: "studentProfile",
  initialState: { profile: null },
  reducers: {
    setStudentProfile: (state, action) => {
      state.profile = state.actionPayload;
    },
  },
});
