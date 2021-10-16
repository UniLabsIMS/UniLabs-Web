import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Error404 from '../app/commonComponents/error404';
import ProtectedLecturerRoute from './components/protectedLecturerRoute';
import LecturerDashboard from '../app/lecturerPages/Dashboard/Dashboard';
import LecturerRequestViewPage from '../app/lecturerPages/RequestPage/RequestView';

function LecturerRoutes() {
  const { path } = useRouteMatch();

  return (
    <>
      <Helmet>
        <title>UniLabs Lecturer</title>
      </Helmet>
      <Switch>
        <ProtectedLecturerRoute
          path={`${path}/`}
          component={LecturerDashboard}
          exact
        />
        <ProtectedLecturerRoute
          path={`${path}/request/:requestId`}
          component={LecturerRequestViewPage}
          exact
        />
        <Route component={Error404} />
      </Switch>
    </>
  );
}

export default LecturerRoutes;
