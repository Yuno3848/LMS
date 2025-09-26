import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router";
import Routes from "../Routes";
import useInitAuth from "./EffectsForApp/UseInitAuth";
import useInitStudentProfile from "./EffectsForApp/useInitStudentProfile";
import useInitInstructorProfile from "./EffectsForApp/useInitInstructorProfile";

function App() {
  useInitAuth();
  useInitStudentProfile();
  useInitInstructorProfile();

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
