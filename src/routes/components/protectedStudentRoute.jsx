import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { STUDENT_ROLE } from '../../app/constants';

const ProtectedStudentRoute = ({ component: Component, path }) => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const user = useSelector(state => state.auth.user);
  return (
    <Route
      exact
      path={path}
      render={props => {
        if (isAuthenticated && user.role === STUDENT_ROLE) {
          return <Component />;
        }
        return <Redirect to="/" />;
      }}
    />
  );
};

ProtectedStudentRoute.propTypes = {
  component: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
};

export default ProtectedStudentRoute;
