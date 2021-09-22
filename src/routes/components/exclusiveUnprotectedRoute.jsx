import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import {
  ADMIN_ROLE,
  LAB_MANAGER_ROLE,
  LAB_ASSISTANT_ROLE,
  STUDENT_ROLE,
  LECTURER_ROLE,
  ADMIN_BASE_URL,
  LAB_MANAGER_BASE_URL,
  LAB_ASSISTANT_BASE_URL,
  STUDENT_BASE_URL,
  LECTURER_BASE_URL,
} from '../../app/constants';

const ExclusiveUnprotectedRoute = ({ component: Component, path }) => {
  const auth = useSelector(state => state.auth);
  return (
    <Route
      exact
      path={path}
      render={props => {
        if (auth.isAuthenticated) {
          if (auth.user.role === ADMIN_ROLE) {
            return <Redirect to={ADMIN_BASE_URL} />;
          }
          if (auth.user.role === LAB_MANAGER_ROLE) {
            return <Redirect to={LAB_MANAGER_BASE_URL} />;
          }
          if (auth.user.role === LAB_ASSISTANT_ROLE) {
            return <Redirect to={LAB_ASSISTANT_BASE_URL} />;
          }
          if (auth.user.role === STUDENT_ROLE) {
            return <Redirect to={STUDENT_BASE_URL} />;
          }
          if (auth.user.role === LECTURER_ROLE) {
            return <Redirect to={LECTURER_BASE_URL} />;
          }
        }
        return <Component />;
      }}
    />
  );
};

ExclusiveUnprotectedRoute.propTypes = {
  component: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
};

export default ExclusiveUnprotectedRoute;
