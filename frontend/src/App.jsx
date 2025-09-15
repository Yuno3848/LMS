import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router";

import routes from "../routes";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./components/Loading";
import { authApi } from "./ApiFetch";
import { loginSuccess, logout } from "./redux/authSlicer";
import { useEffect } from "react";

function App() {
  const loading = useSelector((state) => state.auth.loading);
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

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <RouterProvider router={routes} />
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
