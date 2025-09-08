import { useContext, useState } from "react";
import SignUp from "./pages/SignUp/SignUp";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router";
import { AuthContext } from "./Context/AuthContext";

function App() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }
  const router = createBrowserRouter([
    {
      path: "/",
      element: user ? <Home /> : <Navigate to="/login" />,
    },
    {
      path: "/login",
      element: !user ? <Login /> : <Navigate to="/" />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <Toaster
        position="top-center"
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
