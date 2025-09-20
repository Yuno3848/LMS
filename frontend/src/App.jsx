import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router";
import Routes from "../Routes";
import useInitAuth from "./EffectsForApp/UseInitAuth";
import useInitStudentProfile from "./EffectsForApp/useInitStudentProfile";

function App() {
  useInitAuth();
  useInitStudentProfile();

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
