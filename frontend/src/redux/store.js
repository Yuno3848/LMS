import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slicers/authSlicer";
import studentProfileReducer from "./slicers/studentProfileSlicer"
export const store = configureStore({
  reducer: {
    auth: authReducer,
    studentProfile: studentProfileReducer,
  },
});
