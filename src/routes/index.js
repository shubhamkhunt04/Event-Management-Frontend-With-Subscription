// import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NotFoundPage from "../components/common/NotFoundPage";
import Event from "../components/modules/Event/CreateEvent";
import Home from "../components/modules/Home/Home";
import { commonRoutes } from "../components/common/constants";
import Login from "../components/modules/Auth/Login";
import { AuthProvider } from "../components/context/auth";
import SignUp from "../components/modules/Auth/SignUp";
import AuthRoute from "../components/util/AuthRoute";
import ProtectRoute from "../components/util/ProtectRoute";

const Routes = () => {
  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <Switch>
            <ProtectRoute exact path={commonRoutes.Home} component={Home} />
            <ProtectRoute exact path={commonRoutes.Event} component={Event} />
            <AuthRoute exact path={commonRoutes.SignUp} component={SignUp} />
            <AuthRoute exact path={commonRoutes.Login} component={Login} />
            <Route path="*" component={NotFoundPage} />
          </Switch>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
};

export default Routes;
