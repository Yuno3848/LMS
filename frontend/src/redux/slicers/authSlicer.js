import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",

  initialState: { user: null, loading: true },
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.loading = false;
    },
    logout: (state) => {
      state.user = null;
      state.loading = false;
    },
    updateUser: (state, action) => {
      if (state.user) {
        state.user = {
          ...state.user,
          ...action.payload,
        };
      } else {
        state.user = action.payload;
      }
    },
    setLoading: (state, action) => {
      state.loading = action.payload; 
    },
  },
});
export const { loginSuccess, logout, setLoading, updateUser } =
  authSlice.actions;
export default authSlice.reducer;
