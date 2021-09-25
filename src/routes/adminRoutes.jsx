import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Error404 from '../app/commonComponents/error404';
import AdminDashboard from '../app/adminPages/Dashboard/Dashboard';
import ProtectedAdminRoute from './components/protectedAdminRoute';

function AdminRoutes() {
  const { path } = useRouteMatch();

  return (
    <>
      <Helmet>
        <title>UniLabs Admin</title>
      </Helmet>
      <Switch>
        <ProtectedAdminRoute
          path={`${path}/`}
          component={AdminDashboard}
          exact
        />
        <Route component={Error404} />
      </Switch>
    </>
  );
}

export default AdminRoutes;
