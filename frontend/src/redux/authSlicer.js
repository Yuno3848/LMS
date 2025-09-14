import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",

  initialState: { user: null, loading: false, avatar: "" },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.loading = false;
    },
    logout: (state) => {
      state.user = null;
      state.loading = false;
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    updateAvatar: (state, action) => {
      state.avatar = action.payload;
    },
  },
});
export const { loginSuccess, logout, setLoading, updateUser, updateAvatar } =
  authSlice.actions;
export default authSlice.reducer;
