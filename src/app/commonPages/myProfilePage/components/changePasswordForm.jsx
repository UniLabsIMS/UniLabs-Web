import {
  Button,
  Typography,
  TextField,
  makeStyles,
  Box,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { Zoom } from 'react-awesome-reveal';

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
}));
const ChangePasswordForm = ({ onSave, onCancel }) => {
  const classes = useStyles();
  return (
    <Box align="center">
      <Zoom triggerOnce>
        <form onSubmit={onSave} className={classes.form}>
          <Typography component="h1" variant="h5">
            Change Password
          </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="curretPwd"
            label="Current Password"
            type="curretPwd"
            id="curretPwd"
            // value={curretPwd}
            // onChange={e => setEmail(e.target.value)}
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="newPwd"
            label="New Password"
            type="newPwd"
            id="newPwd"
            // value={newPwd}
            // onChange={e => setEmail(e.target.value)}
          />
          <div>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="confirmNewPwd"
              label="Confirm New Password"
              type="confirmNewPwd"
              id="confirmNewPwd"
              // value={confirmNewPwd}
              // onChange={e => setEmail(e.target.value)}
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
