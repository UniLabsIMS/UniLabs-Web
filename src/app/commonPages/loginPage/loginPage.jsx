import {
  Button,
  CssBaseline,
  TextField,
  makeStyles,
  Typography,
  Container,
  Box,
  Snackbar,
  IconButton,
  SnackbarContent,
} from '@material-ui/core';
import ParticlesBg from 'particles-bg';
import { useState } from 'react';
import { Zoom } from 'react-awesome-reveal';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Typewriter } from 'react-simple-typewriter';
import CloseIcon from '@material-ui/icons/Close';
import { ReactComponent as Logo1 } from '../../../Logo 6.2.svg';
import { login } from '../../../store/actions/authActions';
import CustomLoadingIndicator from '../../commonComponents/customLoadingIndicator';
import ErrorAlert from '../../commonComponents/errorAlert';
import SuccessAlert from '../../commonComponents/successAlert';
import ForgotPasswordForm from '../components/forgotPasswordForm';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(10),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  loginForm: {
    width: '100%',
    marginTop: theme.spacing(0),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  submit: {
    margin: theme.spacing(3, 0, 0),
  },
  unilabsLogo: {
    marginTop: theme.spacing(2),
    width: '50%',
  },
  subtitle: {
    fontSize: 28,
    textAlign: 'center',
  },
  typeWriterWrapper: {
    fontWeight: 'bold',
    color: theme.palette.secondary.main,
  },
  forgotPassword: {
    cursor: 'pointer',
    textDecoration: 'underline',
  },
  forgotPassModal: {
    width: '50%',
    margin: 'auto',
    marginTop: theme.spacing(10),
  },
  apkSnackBar: {
    backgroundColor: 'white',
    color: 'black',
    fontSize: 16,
  },
}));

function LoginPage() {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [APKSnackBarOpen, setAPKSnackBarOpen] = useState(true);
  const [forgotPasswordModalState, setForgotPasswordModalState] =
    useState(false);
  const handleForgotPasswordModalOpen = () => setForgotPasswordModalState(true);
  const handleForgotPasswordModalClose = () =>
    setForgotPasswordModalState(false);

  const isLoginLoading = useSelector(state => state.auth.isLoginLoading);
  const authError = useSelector(state => state.auth.error);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const isForgotPasswordSuccess = useSelector(
    state => state.auth.forgotPasswordSuccess,
  );
  const isForgotPasswordError = useSelector(
    state => state.auth.forgotPasswordError,
  );
  const dispatch = useDispatch();
  const handleLogin = e => {
    e.preventDefault();
    dispatch(login(email, password));
  };
  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  if (isLoginLoading) {
    return <CustomLoadingIndicator />;
  }
  return (
    <div className="bigContainer">
      <ParticlesBg
        color="#009688"
        type="cobweb"
        num={window.innerWidth / 40}
        bg
      />

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Zoom triggerOnce>
            <Typography component="h1" variant="h4">
              Welcome to UniLabs
            </Typography>
          </Zoom>

          <Zoom triggerOnce className={classes.unilabsLogo}>
            <Logo1 />
          </Zoom>
          <div className={classes.loginForm}>
            <Zoom triggerOnce>
              <Typography component="h1" variant="h5">
                Log In
              </Typography>
              {authError ? (
                <ErrorAlert message="Invalid Email or Password" />
              ) : (
                <div />
              )}
              {isForgotPasswordSuccess ? (
                <SuccessAlert message="Password Reset Successful.Please check your email to have your new password." />
              ) : (
                <div />
              )}
              {isForgotPasswordError ? (
                <ErrorAlert message="Password Reset Failed. This may be due to email being an invalid one." />
              ) : (
                <div />
              )}
              <form className={classes.form} onSubmit={handleLogin}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  autoFocus
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Log In
                </Button>
                <Box m={2} />
                <Typography
                  color="secondary"
                  className={classes.forgotPassword}
                  onClick={handleForgotPasswordModalOpen}
                >
                  Forgot Your Password?
                </Typography>
              </form>
              <ForgotPasswordForm
                onClose={handleForgotPasswordModalClose}
                open={forgotPasswordModalState}
              />
            </Zoom>
          </div>
        </div>
        <div className={classes.subtitle}>
          <span>
            UniLabs System is{' '}
            <span className={classes.typeWriterWrapper}>
              <Typewriter
                words={['Effective', 'Simple', 'Reliable']}
                loop={0}
                cursor
              />
            </span>
          </span>
        </div>
      </Container>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={APKSnackBarOpen}
      >
        <SnackbarContent
          className={classes.apkSnackBar}
          message="Are you a Lab Assistant ? "
          action={
            <>
              <Button
                color="secondary"
                size="small"
                onClick={() =>
                  window.open(process.env.REACT_APP_MOBILE_APK_URL, '_blank')
                }
              >
                Get the APK
              </Button>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={() => setAPKSnackBarOpen(false)}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </>
          }
        />
      </Snackbar>
    </div>
  );
}

export default LoginPage;
