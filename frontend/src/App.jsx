import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router";


import { useDispatch, useSelector } from "react-redux";
import Loading from "./components/Loading";

import { loginSuccess, logout } from "./redux/slicers/authSlicer";
import { useEffect } from "react";
import { authApi } from "./ApiFetch/authApiFetch";
import Routes from "../Routes";
import useInitAuth from "./EffectsForApp/UseInitAuth";


function App() {
  useInitAuth()

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
