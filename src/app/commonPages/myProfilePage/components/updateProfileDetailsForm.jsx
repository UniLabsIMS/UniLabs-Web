import {
  Button,
  makeStyles,
  Typography,
  TextField,
  Box,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Zoom } from 'react-awesome-reveal';
import { useState } from 'react';
import ErrorAlert from '../../../commonComponents/errorAlert';
import CustomLoadingIndicator from '../../../commonComponents/customLoadingIndicator';
import { updateProfileDetails } from '../../../../store/actions/authActions';

const useStyles = makeStyles(theme => ({
  form: {
    width: '50%',
    marginTop: theme.spacing(1),
    flexDirection: 'column',
    alignItems: 'center',
  },
  btn: {
    marginTop: theme.spacing(1),
    padding: theme.spacing(1),
    width: '100%',
  },
  label: {
    fontSize: '18px',
    marginTop: theme.spacing(1.5),
  },
}));

const UpdateProfileDetailsForm = ({ onSave, onCancel }) => {
  const classes = useStyles();

  const isUpdateProfileLoading = useSelector(
    state => state.auth.isUpdateProfileLoading,
  );

  const savedFirstName = useSelector(state => state.auth.user.firstName);
  const savedLastName = useSelector(state => state.auth.user.lastName);
  const savedContactNumber = useSelector(
    state => state.auth.user.contactNumber,
  );
  const [firstName, setFirstName] = useState(savedFirstName);
  const [lastName, setLastName] = useState(savedLastName);
  const [contactNumber, setContactNumber] = useState(savedContactNumber);
  const [validationError, setValidationError] = useState('');

  const dispatch = useDispatch();

  const isValid = () => {
    if (contactNumber.length > 0) {
      if (isNaN(contactNumber)) {
        setValidationError('Contact Number must contain only digits');
        return false;
      }
      if (contactNumber.length < 5 || contactNumber.length > 15) {
        setValidationError('Contact Number should be between 5 and 15 digits');
        return false;
      }
    }
    setValidationError('');
    return true;
  };
  const handleSubmit = e => {
    e.preventDefault();
    const validation = isValid();
    if (validation) {
      dispatch(updateProfileDetails(firstName, lastName, contactNumber));
      onSave();
    }
  };
  if (isUpdateProfileLoading) {
    return <CustomLoadingIndicator minimumHeight="40vh" />;
  }
  return (
    <Box align="center">
      <Zoom triggerOnce>
        <Typography component="h1" variant="h5">
          Change Profile Details
        </Typography>
        {validationError.length > 0 ? (
          <ErrorAlert message={validationError} />
        ) : (
          <div />
        )}

        <form className={classes.form} onSubmit={handleSubmit}>
          <div>
            <Typography align="left" className={classes.label}>
              First Name
            </Typography>
            <TextField
              variant="outlined"
              size="small"
              required
              fullWidth
              id="firstName"
              name="firstName"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
            />
          </div>
          <div>
            <Typography align="left" className={classes.label}>
              Last Name
            </Typography>
            <TextField
              variant="outlined"
              size="small"
              required
              fullWidth
              id="lastName"
              name="lastName"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
            />
          </div>
          <div>
            <Typography align="left" className={classes.label}>
              Contact Number
            </Typography>
            <Typography align="left" color="textSecondary" fontSize="small">
              Must be greater than 5 digits and less than 15 digits
            </Typography>
            <TextField
              variant="outlined"
              size="small"
              fullWidth
              name="contactNumber"
              type="contactNumber"
              id="contactNumber"
              value={contactNumber}
              onChange={e => setContactNumber(e.target.value)}
            />
          </div>
          <Box m={1} />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.btn}
          >
            Save Changes
          </Button>
          <Box m={1} />
          <Button
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
UpdateProfileDetailsForm.propTypes = {
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
export default UpdateProfileDetailsForm;
