import React from "react";
import { useSelector } from "react-redux";
import { Redirect, useLocation } from "react-router-dom";

const AuthRequire = ({ children }) => {
  const location = useLocation();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (!isAuthenticated) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Redirect to="/signIn" state={{ from: location }} replace />;
  }

  return children;
};

export default AuthRequire;
