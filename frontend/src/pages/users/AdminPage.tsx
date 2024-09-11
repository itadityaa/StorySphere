import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import { useSelector } from "react-redux";

import AdminNavigation from "../../components/admin/AdminNavigation";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  if (!user || user.role !== "admin") {
    return <Navigate to="/" />;
  }

  return (
    <div className="mx-auto flex flex-col md:flex-row gap-4 items-start justify-start bg-bgPrimary h-screentext-accentPrimary">
      <header className="lg:w-1/5 sm:2/5 w-full">
        <AdminNavigation />
      </header>
      <main className="w-full p-8">
        <p className="text-center text-accentSecondary font-medium text-2xl m-2">
          Admin Panel
        </p>
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
