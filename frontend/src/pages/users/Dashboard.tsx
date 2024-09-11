import React from "react";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="container mx-auto flex flex-col md:flex-row gap-4 items-start justify-start">
      <header className="lg:w-1/5 sm:2/5 w-full">Admin Navigation</header>
      <main>
        Admin Panel
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
