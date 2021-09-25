import { makeStyles } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  alert: {
    width: '75%',
    margin: 'auto',
    justifyContent: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
  },
}));
function SuccessAlert({ message }) {
  const classes = useStyles();
  return (
    <Alert severity="success" className={classes.alert}>
      {message}
    </Alert>
  );
}

SuccessAlert.propTypes = {
  message: PropTypes.string.isRequired,
};

export default SuccessAlert;
