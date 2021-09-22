import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProtectedCommonUserRoute = ({ component: Component, path }) => (
  <Route
    exact
    path={path}
    render={props => (
      // if (!auth.isAuthenticated) {
      //   return <Redirect to="/" />;
      // }else if (not student) redirect to Student home
      <Component />
    )}
  />
);

ProtectedCommonUserRoute.propTypes = {
  component: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
};

export default ProtectedCommonUserRoute;
