import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Error404 from '../app/commonComponents/error404';
import StudentDashboard from '../app/studentPages/Dashboard/Dashboard';
import ProtectedStudentRoute from './components/protectedStudentRoute';
import StudentCategoriesPage from '../app/studentPages/Categories/studentCategoriesPage';
import StudentDisplayItemsPage from '../app/studentPages/DisplayItems/studentDisplayItemsPage';

function StudentRoutes() {
  const { path } = useRouteMatch();

  return (
    <>
      <Helmet>
        <title>UniLabs Student</title>
      </Helmet>
      <Switch>
        <ProtectedStudentRoute
          path={`${path}/`}
          component={StudentDashboard}
          exact
        />
        <ProtectedStudentRoute
          path={`${path}/lab/:labId`}
          component={StudentCategoriesPage}
          exact
        />
        <ProtectedStudentRoute
          path={`${path}/lab/:labId/category/:categoryID`}
          component={StudentDisplayItemsPage}
          exact
        />
        <Route component={Error404} />
      </Switch>
    </>
  );
}

export default StudentRoutes;
