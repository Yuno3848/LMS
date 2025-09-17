import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slicers/authSlicer";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    // studentProfile: studentProfileReducer,
  },
});
