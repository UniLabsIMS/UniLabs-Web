import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProtectedLecturerRoute = ({ component: Component, path }) => (
  <Route
    exact
    path={path}
    render={props => (
      // if (!auth.isAuthenticated) {
      //   return <Redirect to="/" />;
      // }else if (not Lecturer) redirect to Lecturer home
      <Component />
    )}
  />
);

ProtectedLecturerRoute.propTypes = {
  component: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
};

export default ProtectedLecturerRoute;
