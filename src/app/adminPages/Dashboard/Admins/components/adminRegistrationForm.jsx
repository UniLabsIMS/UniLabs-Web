import {
  Button,
  CssBaseline,
  TextField,
  makeStyles,
  Typography,
  Container,
} from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addAdmin } from '../../../../../store/actions/admin/adminAdminsActions';
import CustomLoadingIndicator from '../../../../commonComponents/customLoadingIndicator';
import ErrorAlert from '../../../../commonComponents/errorAlert';
import SuccessAlert from '../../../../commonComponents/successAlert';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(5),
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
    margin: theme.spacing(3, 0, 2),
  },
  unilabsLogo: {
    marginTop: theme.spacing(2),
    width: '50%',
  },
}));

function RegisterAdmin() {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(addAdmin(email));
  };

  const newAdminLoading = useSelector(
    state => state.adminAdmins.newAdminLoading,
  );
  const newAdminError = useSelector(state => state.adminAdmins.newAdminError);

  const newAdminSuccess = useSelector(
    state => state.adminAdmins.newAdminSuccess,
  );

  useEffect(() => {
    if (newAdminSuccess) {
      setEmail('');
    }
  }, [newAdminSuccess]);
  if (newAdminLoading) {
    return <CustomLoadingIndicator />;
  }

  return (
    <div className="bigContainer">
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <div className={classes.loginForm}>
            <Typography component="h1" variant="h5">
              Add New Admin
            </Typography>
            {newAdminError === true ? (
              <ErrorAlert message="Failed to add new admin.Make sure that the email is not a duplicate." />
            ) : (
              <div />
            )}
            {newAdminSuccess === true ? (
              <SuccessAlert message="Successfully Added a New Admin." />
            ) : (
              <div />
            )}
            <form className={classes.form} onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                type="email"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                className={classes.submit}
              >
                Register Admin
              </Button>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default RegisterAdmin;
