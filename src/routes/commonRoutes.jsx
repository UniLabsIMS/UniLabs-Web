import { Helmet } from 'react-helmet';
import { Route, Switch } from 'react-router-dom';
import Error404 from '../app/commonComponents/error404';
import LoginPage from '../app/commonPages/loginPage/loginPage';
import ExclusiveUnprotectedRoute from './components/exclusiveUnprotectedRoute';

function CommonRoutes() {
  return (
    <>
      <Helmet>
        <title>UniLabs</title>
      </Helmet>
      <Switch>
        <ExclusiveUnprotectedRoute path="/" component={LoginPage} exact />
        <Route component={Error404} />
      </Switch>
    </>
  );
}

export default CommonRoutes;
