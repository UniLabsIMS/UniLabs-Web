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
import { addDepartment } from '../../../../../store/actions/admin/adminDepartmentsActions';
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
  newForm: {
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
}));

function CreateDepartment() {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(addDepartment(name, code));
  };

  const newDepLoading = useSelector(
    state => state.adminDepartments.newDepartmentLoading,
  );
  const newDepError = useSelector(
    state => state.adminDepartments.newDepartmentError,
  );

  const newDepSuccess = useSelector(
    state => state.adminDepartments.newDepartmentSuccess,
  );

  useEffect(() => {
    if (newDepSuccess) {
      setName('');
      setCode('');
    }
  }, [newDepSuccess]);
  if (newDepLoading) {
    return <CustomLoadingIndicator />;
  }
  return (
    <div className="bigContainer">
      <Container component="main">
        <CssBaseline />
        <div className={classes.paper}>
          <div className={classes.newForm}>
            <div className={classes.formLine}>
              <Typography component="h1" variant="h5">
                Create a new Department
              </Typography>
            </div>
            {newDepError === true ? (
              <ErrorAlert message="Failed to add new department, This may be becuase the department name or code is a duplicate" />
            ) : (
              <div />
            )}
            {newDepSuccess === true ? (
              <SuccessAlert message="Successfully added new department." />
            ) : (
              <div />
            )}
            <form className={classes.form} onSubmit={handleSubmit}>
              <div className={classes.formLine}>
                <TextField
                  className={classes.texts}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Name"
                  name="email"
                  autoComplete="email"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  // autoFocus
                />
                <TextField
                  className={classes.texts}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Code"
                  name="email"
                  autoComplete="email"
                  value={code}
                  onChange={e => setCode(e.target.value)}
                  // autoFocus
                />
              </div>
              <div className={classes.formLine}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Create Department
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default CreateDepartment;
