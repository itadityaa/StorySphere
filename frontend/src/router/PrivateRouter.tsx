import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRouter = ({ children }: { children: React.ReactNode }) => {
  const { user } = useSelector((state) => state.auth);
  //   const token = document.cookie;
  const location = useLocation();

  if (user) {
    return children;
  } else {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
};

export default PrivateRouter;
