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
import { addLab } from '../../../../../store/actions/admin/adminLabsActions';
import CustomLoadingIndicator from '../../../../commonComponents/customLoadingIndicator';
import ErrorAlert from '../../../../commonComponents/errorAlert';
import SuccessAlert from '../../../../commonComponents/successAlert';
import {
  fetchDepartments,
  resetAdminDepartmentState,
} from '../../../../../store/actions/admin/adminDepartmentsActions';

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

function CreateLab() {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [location, setLocation] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(addLab(name, department, location, contactNo, contactEmail));
  };

  const isDepartmentsLoading = useSelector(
    state => state.adminDepartments.isDepartmentsLoading,
  );
  const isDepartmentsError = useSelector(
    state => state.adminDepartments.isDepartmentsError,
  );
  const departmentsLst = useSelector(
    state => state.adminDepartments.departments,
  );
  const reload = useSelector(state => state.adminDepartments.reloadDepartments);
  useEffect(() => {
    dispatch(fetchDepartments());
  }, [dispatch, reload]);
  useEffect(
    () => () => {
      dispatch(resetAdminDepartmentState());
    },
    [dispatch],
  );

  const allDepartments = departmentsLst.map(dep => (
    <MenuItem key={dep.id} value={dep.id}>
      {dep.name}
    </MenuItem>
  ));

  const newStudLoading = useSelector(state => state.adminLabs.newLabLoading);
  const newStudError = useSelector(state => state.adminLabs.newLabError);

  const newStudSuccess = useSelector(state => state.adminLabs.newLabSuccess);

  useEffect(() => {
    if (newStudSuccess) {
      setName('');
      setDepartment('');
      setLocation('');
      setContactNo('');
      setContactEmail('');
    }
  }, [newStudSuccess]);
  if (newStudLoading) {
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
                Create a new Laboratory
              </Typography>
            </div>
            {newStudError === true ? (
              <ErrorAlert message="Failed to add new lab, This may be becuase the lab email or name is a duplicate" />
            ) : (
              <div />
            )}
            {newStudSuccess === true ? (
              <SuccessAlert message="Successfully added new lab." />
            ) : (
              <div />
            )}
            {isDepartmentsError ? (
              <ErrorAlert message="Failed to load departments" />
            ) : (
              <div className={classes.fullDiv}>
                {isDepartmentsLoading ? (
                  <CustomLoadingIndicator minimumHeight="60vh" />
                ) : (
                  <form
                    className={classes.form}
                    noValidate
                    onSubmit={handleSubmit}
                  >
                    <div className={classes.formLine}>
                      <TextField
                        className={classes.texts}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Name"
                        name="name"
                        autoComplete="name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        // autoFocus
                      />
                      <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">
                          Department
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={department}
                          onChange={e => setDepartment(e.target.value)}
                        >
                          {allDepartments}
                        </Select>
                      </FormControl>
                    </div>
                    <div className={classes.formLine}>
                      <TextField
                        className={classes.texts}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="location"
                        label="Loctaion"
                        name="location"
                        autoComplete="location"
                        value={location}
                        onChange={e => setLocation(e.target.value)}
                        // autoFocus
                      />
                      <TextField
                        className={classes.texts}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="contactNo"
                        label="Contact Number"
                        name="contactNo"
                        autoComplete="contactNo"
                        value={contactNo}
                        onChange={e => setContactNo(e.target.value)}
                        // autoFocus
                      />
                    </div>
                    <div className={classes.formLine}>
                      <TextField
                        className={classes.texts}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="contactEmail"
                        label="Contact Email"
                        name="contactEmail"
                        autoComplete="contactEmail"
                        value={contactEmail}
                        onChange={e => setContactEmail(e.target.value)}
                        // autoFocus
                      />
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                      >
                        Create Laboratory
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

export default CreateLab;
