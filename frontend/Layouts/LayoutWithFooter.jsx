import React from "react";
import Footer from "../src/components/Footer";
import { Outlet } from "react-router";
import Header from "../src/components/Header";

const LayoutWithFooter = () => {
  return (
    <div>
     
      <Outlet />
      <Footer />
    </div>
  );
};

export default LayoutWithFooter;
