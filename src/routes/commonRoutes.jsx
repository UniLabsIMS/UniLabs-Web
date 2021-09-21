import { Helmet } from 'react-helmet';
import { Route, Switch } from 'react-router-dom';
import Error404 from '../app/commonComponents/error404';
import ProtectedCommonUserRoute from './components/protectedCommonUserRoute';
import LoginPage from '../app/commonPages/loginPage/loginPage';
import MyProfilePage from '../app/commonPages/myProfilePage/myProfilePage';

function CommonRoutes() {
  return (
    <>
      <Helmet>
        <title>UniLabs</title>
      </Helmet>
      <Switch>
        <Route path="/" component={LoginPage} exact />
        <ProtectedCommonUserRoute
          path="/myProfile"
          component={MyProfilePage}
          exact
        />
        <Route component={Error404} />
      </Switch>
    </>
  );
}

export default CommonRoutes;
