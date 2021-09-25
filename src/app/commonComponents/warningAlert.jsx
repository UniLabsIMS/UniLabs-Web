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
function WarningAlert({ message }) {
  const classes = useStyles();
  return (
    <Alert severity="warning" sx={{ width: '100%' }} className={classes.alert}>
      {message}
    </Alert>
  );
}

WarningAlert.propTypes = {
  message: PropTypes.string.isRequired,
};

export default WarningAlert;
