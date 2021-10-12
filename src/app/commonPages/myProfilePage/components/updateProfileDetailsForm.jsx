import {
  Button,
  makeStyles,
  Typography,
  TextField,
  Box,
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Zoom } from 'react-awesome-reveal';

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
    marginTop: theme.spacing(0.5),
  },
}));

const UpdateProfileDetailsForm = ({ onSave, onCancel }) => {
  const classes = useStyles();
  const firstName = useSelector(state => state.auth.user.firstName);
  const lastName = useSelector(state => state.auth.user.lastName);
  const contactNumber = useSelector(state => state.auth.user.contactNumber);
  return (
    <Box align="center">
      <Zoom triggerOnce>
        <Typography component="h1" variant="h5">
          Change Profile Details
        </Typography>
        <form className={classes.form} onSubmit={onSave}>
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
              defaultValue={firstName}
              name="firstName"
              // value={firstName}
              // onChange={e => setFirstName(e.target.value)}
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
              defaultValue={lastName}
              name="lastName"
              // value={lastName}
              // onChange={e => setLastName(e.target.value)}
            />
          </div>
          <div>
            <Typography align="left" className={classes.label}>
              Contact Number
            </Typography>
            <TextField
              variant="outlined"
              size="small"
              required
              fullWidth
              name="contactNumber"
              defaultValue={contactNumber}
              type="contactNumber"
              id="contactNumber"
              // value={password}
              // onChange={e => setContactNum(e.target.value)}
            />
          </div>
          <Box m={1} />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.btn}
            onClick={onCancel}
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
