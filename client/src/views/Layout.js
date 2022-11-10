import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/footer/Footer";
import TopBanner from "../components/topBanner/TopBanner";

const Layout = () => {
  return (
    <div>
      <TopBanner />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
