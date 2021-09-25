import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { LAB_ASSISTANT_ROLE } from '../../app/constants';

const ProtectedLabAssistantRoute = ({ component: Component, path }) => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const user = useSelector(state => state.auth.user);
  return (
    <Route
      exact
      path={path}
      render={props => {
        if (isAuthenticated && user.role === LAB_ASSISTANT_ROLE) {
          return <Component />;
        }
        return <Redirect to="/" />;
      }}
    />
  );
};

ProtectedLabAssistantRoute.propTypes = {
  component: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
};

export default ProtectedLabAssistantRoute;
