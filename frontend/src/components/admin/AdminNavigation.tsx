import React from "react";
import adminIcon from "../../assets/admin.png";
import { NavLink } from "react-router-dom";

const AdminNavigation = () => {
  return (
    <div className="space-y-4 p-8 md:h-[90vh] flex flex-col justify-between">
      <div>
        <header>
          <img src={adminIcon} alt="Admin" className="w-20 h-20 mt-4 mx-auto" />
          <p className="font-medium mt-4 text-center text-accentPrimary">
            Admin
          </p>
        </header>
        <hr className="m-4" />
        <ul className="space-y-4 p-4">
          <li>
            <NavLink
              to="/dashboard"
              end
              className={({ isActive }) =>
                isActive
                  ? "text-accentSecondary font-medium"
                  : "text-accentPrimary"
              }
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/new-post"
              className={({ isActive }) =>
                isActive
                  ? "text-accentSecondary font-medium"
                  : "text-accentPrimary"
              }
            >
              Add New Post
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/manage-items"
              className={({ isActive }) =>
                isActive
                  ? "text-accentSecondary font-medium"
                  : "text-accentPrimary"
              }
            >
              Manage Website
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/users"
              className={({ isActive }) =>
                isActive
                  ? "text-accentSecondary font-medium"
                  : "text-accentPrimary"
              }
            >
              Users
            </NavLink>
          </li>
        </ul>
      </div>
      <footer>
        <p className="text-center text-accentPrimary">
          &copy; 2024 All rights reserved
        </p>
      </footer>
    </div>
  );
};

export default AdminNavigation;
