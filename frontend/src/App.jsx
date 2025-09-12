import { useContext } from "react";
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router";
import { AuthContext } from "./Context/AuthContext";
import routes from "../routes";

function App() {
  const { loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <>
      <RouterProvider router={routes} />
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
