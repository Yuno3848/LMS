import React from "react";

import { Outlet } from "react-router";
import Footer from "../src/components/Footer";
import Header from "../src/components/Header";

const LayoutwithFooter_Header = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default LayoutwithFooter_Header;
