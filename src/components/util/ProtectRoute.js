import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { commonRoutes } from "../common/constants";
import { AuthContext } from "../context/auth";

const ProtectRoute = ({ component: Component, ...rest }) => {
  const { user } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Component {...props} /> : <Redirect to={commonRoutes.Login} />
      }
    />
  );
};

export default ProtectRoute;
