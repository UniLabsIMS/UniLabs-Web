import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Error404 from '../app/commonComponents/error404';
import LabManagerDashboard from '../app/labManagerPages/Dashboard/labMangerDashboard';
import ProtectedLabManagerRoute from './components/protectedLabManagerRoute';
import LabManagerDisplayItemsPage from '../app/labManagerPages/displayItemsPage/displayItemsPage';
import LabManagerItemsPage from '../app/labManagerPages/itemsPage/labManagerItemsPage';

function LabManagerRoutes() {
  const { path } = useRouteMatch();

  return (
    <>
      <Helmet>
        <title>UniLabs LabManager</title>
      </Helmet>
      <Switch>
        <ProtectedLabManagerRoute
          path={`${path}/`}
          component={LabManagerDashboard}
          exact
        />
        <ProtectedLabManagerRoute
          path={`${path}/category/:categoryId`}
          component={LabManagerDisplayItemsPage}
          exact
        />
        <ProtectedLabManagerRoute
          path={`${path}/display_item/:displayItemId`}
          component={LabManagerItemsPage}
          exact
        />
        <Route component={Error404} />
      </Switch>
    </>
  );
}

export default LabManagerRoutes;
