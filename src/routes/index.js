import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { AuthProvider } from 'context/auth';
import { commonRoutes } from 'common/constants';
import NotFoundPage from '../NotFoundPage';
import Events from 'modules/Event/Events';
import CreateEvent from 'modules/Event/CreateEvent';
import Home from 'modules/Home/Home';
import Login from 'modules/Auth/Login';
import SignUp from 'modules/Auth/SignUp';
import ProtectRoute from './ProtectRoute';
import AuthRoute from './AuthRoute';

const Routes = () => {
  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <Switch>
            <ProtectRoute exact path={commonRoutes.Home} component={Home} />
            <ProtectRoute exact path={commonRoutes.Events} component={Events} />
            <ProtectRoute
              exact
              path={commonRoutes.CreateEvent}
              component={CreateEvent}
            />
            <AuthRoute exact path={commonRoutes.SignUp} component={SignUp} />
            <AuthRoute exact path={commonRoutes.Login} component={Login} />
            <Route path='*' component={NotFoundPage} />
          </Switch>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
};

export default Routes;
