import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { commonRoutes } from "../common/constants";
import { AuthContext } from "../context/auth";

const AuthRoute = ({ component: Component, ...rest }) => {
  const { user } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Redirect to={commonRoutes.Home} /> : <Component {...props} />
      }
    />
  );
};

export default AuthRoute;
