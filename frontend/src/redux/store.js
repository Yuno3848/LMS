import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlicer";
export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
