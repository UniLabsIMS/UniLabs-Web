import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { LAB_MANAGER_ROLE } from '../../app/constants';

const ProtectedLabManagerRoute = ({ component: Component, path }) => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const user = useSelector(state => state.auth.user);
  return (
    <Route
      exact
      path={path}
      render={props => {
        if (isAuthenticated && user.role === LAB_MANAGER_ROLE) {
          return <Component />;
        }
        return <Redirect to="/" />;
      }}
    />
  );
};

ProtectedLabManagerRoute.propTypes = {
  component: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
};

export default ProtectedLabManagerRoute;
