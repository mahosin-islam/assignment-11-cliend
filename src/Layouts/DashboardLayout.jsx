import React from "react";
// import { Outlet } from "react-router";
import Sidebar from "../Pages/DashboardPages/Sidebar/Sidebar";

const DashboardLayout = () => {
  return (
    <div className="relative min-h-screen ">
      <Sidebar />
    </div>
  );
};

export default DashboardLayout;
