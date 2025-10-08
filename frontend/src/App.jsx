import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router";
import Routes from "../Routes";

import useInitStudentProfile from "./EffectsForApp/useInitStudentProfile";
import useInitInstructorProfile from "./EffectsForApp/useInitInstructorProfile";
import useInitAuth from "./EffectsForApp/useInitAuth";
import useInitInstructorCourses from "./EffectsForApp/useInitCourse";

function App() {
  useInitAuth();
  useInitStudentProfile();
  useInitInstructorProfile();
  useInitInstructorCourses();

  return (
    <>
      <RouterProvider router={Routes} />
      <Toaster
        reverseOrder={false}
        toastOptions={{
          style: {
            background: "#8B5D3B",
            color: "#fff",
          },
        }}
      />
    </>
  );
}

export default App;
