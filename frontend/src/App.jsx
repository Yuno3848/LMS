import { useState } from "react";
import SignUp from "./components/pages/SignUp/SignUp";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <>
      <SignUp />
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
