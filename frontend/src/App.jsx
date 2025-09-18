import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router";


import { useDispatch, useSelector } from "react-redux";
import Loading from "./components/Loading";

import { loginSuccess, logout } from "./redux/slicers/authSlicer";
import { useEffect } from "react";
import { authApi } from "./ApiFetch/authApiFetch";
import Routes from "../Routes";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await authApi.me();
        console.log("app jsx", result);
        if (result.success) {
          dispatch(loginSuccess(result.data));
        }
      } catch (error) {
        dispatch(logout());
      }
    };
    fetchUser();
  }, [dispatch]);

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
