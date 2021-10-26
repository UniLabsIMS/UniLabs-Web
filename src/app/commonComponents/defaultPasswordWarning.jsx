import { Box, makeStyles } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { Zoom } from 'react-awesome-reveal';
import { Link } from 'react-router-dom';
import { PROFILE_URL } from '../constants';

const useStyles = makeStyles(theme => ({
  alert: {
    width: '75%',
    margin: 'auto',
    justifyContent: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
  },
}));
function DefaultPasswordWarining() {
  const classes = useStyles();
  return (
    <Box m={2}>
      <Zoom triggerOnce>
        <Alert severity="info" sx={{ width: '100%' }} className={classes.alert}>
          You are still using your default password. Please change your password
          from{' '}
          <Link style={{ fontWeight: 'bold' }} to={PROFILE_URL}>
            HERE
          </Link>
        </Alert>
      </Zoom>
    </Box>
  );
}

export default DefaultPasswordWarining;
