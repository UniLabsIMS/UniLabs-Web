import {
  Button,
  Typography,
  TextField,
  makeStyles,
  Box,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { Zoom } from 'react-awesome-reveal';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { changePassword } from '../../../../store/actions/authActions';
import CustomLoadingIndicator from '../../../commonComponents/customLoadingIndicator';
import ErrorAlert from '../../../commonComponents/errorAlert';

const useStyles = makeStyles(theme => ({
  form: {
    width: '50%',
    marginTop: theme.spacing(0),
    flexDirection: 'column',
    alignItems: 'center',
  },
  btn: {
    marginTop: theme.spacing(1),
  },
  label: {
    fontSize: '18px',
    marginTop: theme.spacing(1.5),
  },
  hint: {
    fontSize: '14px',
    marginTop: theme.spacing(1.5),
    color: 'grey',
  },
}));
const ChangePasswordForm = ({ onSave, onCancel }) => {
  const classes = useStyles();

  const isChangePasswordLoading = useSelector(
    state => state.auth.isChangePasswordLoading,
  );

  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmationPass, setConfirmationPass] = useState('');

  const [validationError, setValidationError] = useState('');
  const dispatch = useDispatch();
  const isValid = () => {
    if (newPass.length < 8 || newPass.length > 31) {
      setValidationError(
        'Password should be at least 8 characters long and less than 32 characters',
      );
      return false;
    }
    if (!isNaN(newPass)) {
      setValidationError('Password cannot entirely be numeric');
      return false;
    }
    if (newPass !== confirmationPass) {
      setValidationError('Passwords do not match.');
      return false;
    }
    setValidationError('');
    return true;
  };
  const handleSubmit = e => {
    e.preventDefault();
    const validation = isValid();
    if (validation) {
      dispatch(changePassword(currentPass, newPass));
      setCurrentPass('');
      setNewPass('');
      setConfirmationPass('');
      onSave();
    }
  };
  if (isChangePasswordLoading) {
    return <CustomLoadingIndicator minimumHeight="40vh" />;
  }
  return (
    <Box align="center">
      <Zoom triggerOnce>
        <form onSubmit={handleSubmit} className={classes.form}>
          <Typography component="h1" variant="h5">
            Change Password
          </Typography>
          {validationError.length > 0 ? (
            <ErrorAlert message={validationError} />
          ) : (
            <div />
          )}
          <Typography align="left" className={classes.label}>
            Current Password
          </Typography>
          <TextField
            variant="outlined"
            required
            fullWidth
            name="curretPass"
            type="password"
            id="currentPass"
            value={currentPass}
            onChange={e => setCurrentPass(e.target.value)}
          />
          <Typography align="left" className={classes.label}>
            New Password
          </Typography>
          <Typography align="justify" className={classes.hint}>
            Your password, cannot be too similar to other information, must
            contain at least 8 characters and not more than 31 characters,
            cannot be a commonly used password and cannot be entirely numeric.
          </Typography>
          <TextField
            variant="outlined"
            required
            fullWidth
            name="newPass"
            type="password"
            id="newPass"
            value={newPass}
            onChange={e => setNewPass(e.target.value)}
          />
          <div>
            <Typography align="left" className={classes.label}>
              Confirm New Password
            </Typography>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="confirmationPass"
              type="password"
              id="confirmationPass"
              value={confirmationPass}
              onChange={e => setConfirmationPass(e.target.value)}
            />
          </div>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.btn}
          >
            Change Password
          </Button>
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.btn}
            onClick={onCancel}
          >
            Cancel
          </Button>
        </form>
      </Zoom>
    </Box>
  );
};
ChangePasswordForm.propTypes = {
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
export default ChangePasswordForm;
