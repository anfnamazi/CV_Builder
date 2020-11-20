import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";

const Logout = () => {
  useEffect(() => {
    localStorage.removeItem("token");
    window.location.replace("/login");
  }, []);

  return null;
};

export default withRouter(Logout);
