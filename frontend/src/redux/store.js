import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slicers/authSlicer";
import studentProfileReducer from "./slicers/studentProfileSlicer";
import instructorProfileReducer from "./slicers/instructorProfileSlicer";
import courseReducer from "./slicers/courseSlicer"
export const store = configureStore({
  reducer: {
    auth: authReducer,
    studentProfile: studentProfileReducer,
    instructorProfile: instructorProfileReducer,
    course: courseReducer,
  },
});
