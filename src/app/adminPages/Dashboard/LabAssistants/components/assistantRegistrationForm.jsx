import {
  Button,
  CssBaseline,
  TextField,
  makeStyles,
  Typography,
  Container,
} from '@material-ui/core';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addLabAssistant } from '../../../../../store/actions/admin/adminLabAssistantsActions';
import CustomLoadingIndicator from '../../../../commonComponents/customLoadingIndicator';
import ErrorAlert from '../../../../commonComponents/errorAlert';
import SuccessAlert from '../../../../commonComponents/successAlert';
import {
  fetchLabs,
  resetAdminLabState,
} from '../../../../../store/actions/admin/adminLabsActions';

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
    marginBottom: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  submit: {
    margin: theme.spacing(3, 0, 0),
    display: 'flex',
    width: '40%',
    marginRight: theme.spacing(5),
    marginLeft: theme.spacing(5),
  },
  unilabsLogo: {
    marginTop: theme.spacing(2),
    width: '50%',
  },
  formControl: {
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(5),
    marginLeft: theme.spacing(5),
    margin: theme.spacing(0),
    width: '40%',
  },
  formLine: {
    display: 'flex',
    flexDirection: 'row',
  },
  texts: {
    display: 'flex',
    width: '40%',
    marginRight: theme.spacing(5),
    marginLeft: theme.spacing(5),
  },
  buttons: {
    width: '40%',
  },
  fullDiv: {
    width: '100%',
  },
}));

function RegisterLabAssitant() {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [lab, setLab] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(addLabAssistant(email, lab));
  };

  const isLabsLoading = useSelector(state => state.adminLabs.isLabsLoading);
  const isLabsError = useSelector(state => state.adminLabs.isLabsError);
  const labsLst = useSelector(state => state.adminLabs.labs);
  const reload = useSelector(state => state.adminLabs.reloadLabs);
  useEffect(() => {
    dispatch(fetchLabs());
  }, [dispatch, reload]);
  useEffect(
    () => () => {
      dispatch(resetAdminLabState());
    },
    [dispatch],
  );

  const allLabs = labsLst.map(l => (
    <MenuItem key={l.id} value={l.id}>
      {l.name}
    </MenuItem>
  ));

  const newLabAssisLoading = useSelector(
    state => state.adminLabAssistants.newLabAssistantLoading,
  );
  const newLabAssisError = useSelector(
    state => state.adminLabAssistants.newLabAssistantError,
  );

  const newLabAssisSuccess = useSelector(
    state => state.adminLabAssistants.newLabAssistantSuccess,
  );

  useEffect(() => {
    if (newLabAssisSuccess) {
      setEmail('');
      setLab('');
    }
  }, [newLabAssisSuccess]);
  if (newLabAssisLoading) {
    return <CustomLoadingIndicator />;
  }

  return (
    <div className="bigContainer">
      <Container component="main">
        <CssBaseline />
        <div className={classes.paper}>
          <div className={classes.loginForm}>
            <div className={classes.formLine}>
              <Typography component="h1" variant="h5">
                Add New Lab Assistant
              </Typography>
            </div>
            {newLabAssisError === true ? (
              <ErrorAlert message="Failed to add new Lab Assistant. Make sure all fields are filled and that email is not a duplicate." />
            ) : (
              <div />
            )}
            {newLabAssisSuccess === true ? (
              <SuccessAlert message="Successfully added new labAssistant." />
            ) : (
              <div />
            )}
            {isLabsError ? (
              <ErrorAlert message="Failed to load labs" />
            ) : (
              <div className={classes.fullDiv}>
                {isLabsLoading ? (
                  <CustomLoadingIndicator minimumHeight="60vh" />
                ) : (
                  <form className={classes.form} onSubmit={handleSubmit}>
                    <div className={classes.formLine}>
                      <TextField
                        className={classes.texts}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        type="email"
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                      />
                      <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">
                          Laboratory*
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={lab}
                          onChange={e => setLab(e.target.value)}
                        >
                          {allLabs}
                        </Select>
                      </FormControl>
                    </div>
                    <div className={classes.formLine}>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="secondary"
                        className={classes.submit}
                      >
                        Register Lab Assistant
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}

export default RegisterLabAssitant;
