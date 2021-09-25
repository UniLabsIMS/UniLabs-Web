import { makeStyles } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  alert: {
    width: '75%',
    margin: 'auto',
    justifyContent: 'center',
    fontWeight: 'bold',
  },
}));
function ErrorAlert({ message }) {
  const classes = useStyles();
  return (
    <Alert severity="error" sx={{ width: '100%' }} className={classes.alert}>
      {message}
    </Alert>
  );
}

ErrorAlert.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ErrorAlert;
