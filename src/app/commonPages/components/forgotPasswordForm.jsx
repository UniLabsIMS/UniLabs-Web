import {
  Paper,
  Typography,
  Button,
  TextField,
  makeStyles,
  Grid,
  Modal,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { forgotPassword } from '../../../store/actions/authActions';

const useStyles = makeStyles(theme => ({
  paper: {
    maxWidth: '500px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(5),
  },
  form: {
    width: '95%',
    marginTop: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1, 0, 1),
    letterSpacing: theme.spacing(0.2),
  },
  forgotPassModal: {
    width: '50%',
    margin: 'auto',
    marginTop: theme.spacing(10),
  },
}));
function ForgotPasswordForm({ onClose, open }) {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();

  const handleForgotPasswordSubmit = e => {
    e.preventDefault();
    dispatch(forgotPassword(email));
    onClose();
  };
  const handleClose = () => {
    onClose();
  };

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="forgot-pass-category-modal-title"
        aria-describedby="forgot-pass-category-modal-description"
        align="center"
        className={classes.forgotPassModal}
        onClose={handleClose}
      >
        <Paper
          variant="outlined"
          align="center"
          width="50%"
          className={classes.paper}
        >
          <form className={classes.form} onSubmit={handleForgotPasswordSubmit}>
            <Typography component="h2" variant="h5" gutterBottom align="center">
              Forgot Your Password?
            </Typography>
            <Typography gutterBottom align="center">
              Please enter your email in the box below. We will reset your
              account password and send you an email.
            </Typography>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Email"
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Button
                  align="right"
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  onClick={handleClose}
                >
                  Close
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  type="submit"
                  align="right"
                  variant="contained"
                  color="primary"
                  className={classes.button}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Modal>
    </div>
  );
}
ForgotPasswordForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};
export default ForgotPasswordForm;
