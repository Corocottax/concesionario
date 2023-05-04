import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const RequireAuth = ({ children, accessAdmin }) => {
    
  const { user } = useSelector((state) => state.users);

  if (!user) {

    return <Navigate to="/login" />;

  } else if (accessAdmin && user.rol !== "admin") {

    return <Navigate to="/" />;

  }

  return children;
};

export default RequireAuth;
