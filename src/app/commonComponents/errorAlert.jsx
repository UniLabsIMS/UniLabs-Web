import { Alert } from '@material-ui/lab';
import PropTypes from 'prop-types';

function ErrorAlert({ message }) {
  return (
    <Alert severity="error" sx={{ width: '100%' }}>
      {message}
    </Alert>
  );
}

ErrorAlert.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ErrorAlert;
