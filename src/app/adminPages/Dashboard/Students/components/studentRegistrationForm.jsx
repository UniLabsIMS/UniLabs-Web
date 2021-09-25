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
import { addStudent } from '../../../../../store/actions/admin/adminStudentsActions';
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

function RegisterStudent() {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [studentId, setStudentId] = useState('');
  const [department, setDepartment] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(addStudent(email, studentId, department));
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

  const newStudLoading = useSelector(
    state => state.adminStudents.newStudentLoading,
  );
  const newStudError = useSelector(
    state => state.adminStudents.newStudentError,
  );

  const newStudSuccess = useSelector(
    state => state.adminStudents.newStudentSuccess,
  );

  useEffect(() => {
    if (newStudSuccess) {
      setEmail('');
      setStudentId('');
      setDepartment('');
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
                Add New Student
              </Typography>
            </div>
            {newStudError === true ? (
              <ErrorAlert message="Failed to add new student. Make sure all the fields are filled and email and id are not duplicates" />
            ) : (
              <div />
            )}
            {newStudSuccess === true ? (
              <SuccessAlert message="Successfully added new student." />
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
                  <form className={classes.form} onSubmit={handleSubmit}>
                    <div className={classes.formLine}>
                      <TextField
                        className={classes.texts}
                        type="email"
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
                        // autoFocus
                      />
                      <TextField
                        className={classes.texts}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="studentId"
                        label="Student ID"
                        name="studentId"
                        autoComplete="studentId"
                        value={studentId}
                        onChange={e => setStudentId(e.target.value)}
                      />
                    </div>
                    <div className={classes.formLine}>
                      <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">
                          Department*
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
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="secondary"
                        className={classes.submit}
                      >
                        Register Student
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

export default RegisterStudent;
