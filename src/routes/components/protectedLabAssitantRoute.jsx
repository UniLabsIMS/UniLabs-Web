import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProtectedLabAssistantRoute = ({ component: Component, path }) => (
  <Route
    exact
    path={path}
    render={props => (
      // if (!auth.isAuthenticated) {
      //   return <Redirect to="/" />;
      // }else if (not labmanger) redirect to labAssistant home
      <Component />
    )}
  />
);

ProtectedLabAssistantRoute.propTypes = {
  component: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
};

export default ProtectedLabAssistantRoute;
