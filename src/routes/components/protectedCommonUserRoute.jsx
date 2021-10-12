import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const ProtectedCommonUserRoute = ({ component: Component, path }) => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  return (
    <Route
      exact
      path={path}
      render={props => {
        if (isAuthenticated) {
          return <Component />;
        }
        return <Redirect to="/" />;
      }}
    />
  );
};

ProtectedCommonUserRoute.propTypes = {
  component: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
};

export default ProtectedCommonUserRoute;
