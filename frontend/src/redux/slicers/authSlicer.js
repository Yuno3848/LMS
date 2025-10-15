import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    avatar: null,
    loading: true,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.avatar = action.payload?.data?.avatar || null;
      state.loading = false;
    },
    logout: (state) => {
      state.user = null;
      state.avatar = null;
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
    updateAvatar: (state, action) => {
      state.avatar = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { loginSuccess, logout, setLoading, updateUser, updateAvatar } =
  authSlice.actions;
export default authSlice.reducer;
