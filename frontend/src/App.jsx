import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router";

import routes from "../routes";
import { useSelector } from "react-redux";
import Loading from "./components/Loading";

function App() {
  const loading = useSelector((state) => state.auth.loading);

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
