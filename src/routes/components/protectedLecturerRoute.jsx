import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { LECTURER_ROLE } from '../../app/constants';

const ProtectedLecturerRoute = ({ component: Component, path }) => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const user = useSelector(state => state.auth.user);
  return (
    <Route
      exact
      path={path}
      render={props => {
        if (isAuthenticated && user.role === LECTURER_ROLE) {
          return <Component />;
        }
        return <Redirect to="/" />;
      }}
    />
  );
};

ProtectedLecturerRoute.propTypes = {
  component: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
};

export default ProtectedLecturerRoute;
