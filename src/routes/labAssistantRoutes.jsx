import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Error404 from '../app/commonComponents/error404';
import LabAssistantDashboard from '../app/labAssistantPages/Dashboard/labAssistantDashboard';
import ProtectedLabAssistantRoute from './components/protectedLabAssitantRoute';
import LabAssistantDisplayItemsPage from '../app/labAssistantPages/displayItemsPage/displayItemsPage';
import LabAssistantItemsPage from '../app/labAssistantPages/itemsPage/itemsPage';

function LabAssistantRoutes() {
  const { path } = useRouteMatch();

  return (
    <>
      <Helmet>
        <title>UniLabs LabAssistant</title>
      </Helmet>
      <Switch>
        <ProtectedLabAssistantRoute
          path={`${path}/`}
          component={LabAssistantDashboard}
          exact
        />
        <ProtectedLabAssistantRoute
          path={`${path}/category/:category_id`}
          component={LabAssistantDisplayItemsPage}
          exact
        />
        <ProtectedLabAssistantRoute
          path={`${path}/display_item/:display_item_id`}
          component={LabAssistantItemsPage}
          exact
        />
        <Route component={Error404} />
      </Switch>
    </>
  );
}

export default LabAssistantRoutes;
