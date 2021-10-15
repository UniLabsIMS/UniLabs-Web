import {
  Button,
  CssBaseline,
  TextField,
  makeStyles,
  Typography,
  Container,
  Grid,
  Box,
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
import ImagePicker from '../../../../commonComponents/imagePicker';

const useStyles = makeStyles(theme => ({
  form: {
    width: '80%',
    marginTop: theme.spacing(1),
  },
  formControl: {
    width: '100%',
  },
  grid: {
    display: 'flex',
    justifyContent: 'flex-start',
  },
  button: {
    width: '50%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
  imagePreview: {
    marginTop: theme.spacing(2),
    width: '150px',
    height: '120px',
    border: '1px solid',
    borderColor: theme.palette.primary.main,
  },
}));

function CreateLab() {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [location, setLocation] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [file, setFile] = useState(undefined);
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(addLab(name, department, location, contactNo, contactEmail, file));
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
    <Box align="center">
      <Container component="main">
        <CssBaseline />
        <Box>
          <Box>
            <Typography component="h1" variant="h5">
              Add New Laboratory
            </Typography>
            {newStudError === true ? (
              <ErrorAlert message="Failed to add new lab, This may be becuase the name is a duplicate" />
            ) : (
              <Box />
            )}
            {newStudSuccess === true ? (
              <SuccessAlert message="Successfully added new lab." />
            ) : (
              <Box />
            )}
            {isDepartmentsError ? (
              <ErrorAlert message="Failed to load departments" />
            ) : (
              <Box>
                {isDepartmentsLoading ? (
                  <CustomLoadingIndicator minimumHeight="60vh" />
                ) : (
                  <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={3} alignItems="flex-start">
                      <Grid item xs={12} sm={6}>
                        <TextField
                          variant="outlined"
                          size="small"
                          margin="normal"
                          required
                          fullWidth
                          id="name"
                          label="Name"
                          name="name"
                          autoComplete="name"
                          value={name}
                          onChange={e => setName(e.target.value)}
                        />
                        <TextField
                          variant="outlined"
                          size="small"
                          margin="normal"
                          required
                          fullWidth
                          id="location"
                          label="Loctaion"
                          name="location"
                          autoComplete="location"
                          value={location}
                          onChange={e => setLocation(e.target.value)}
                        />
                        <TextField
                          variant="outlined"
                          size="small"
                          margin="normal"
                          required
                          fullWidth
                          id="contactNo"
                          type="number"
                          label="Contact Number"
                          name="contactNo"
                          autoComplete="contactNo"
                          value={contactNo}
                          onChange={e => setContactNo(e.target.value)}
                        />
                        <TextField
                          variant="outlined"
                          size="small"
                          margin="normal"
                          required
                          fullWidth
                          id="contactEmail"
                          type="email"
                          label="Contact Email"
                          name="contactEmail"
                          autoComplete="contactEmail"
                          value={contactEmail}
                          onChange={e => setContactEmail(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                          <InputLabel id="lab-department-select-label">
                            Department *
                          </InputLabel>
                          <Select
                            fullWidth
                            labelId="lab-department-select-label"
                            id="lab-department-select"
                            required
                            value={department}
                            onChange={e => setDepartment(e.target.value)}
                          >
                            {allDepartments}
                          </Select>
                        </FormControl>
                        {file === undefined ? (
                          <ImagePicker
                            withIcon
                            onChange={newFile => setFile(newFile[0])}
                          />
                        ) : (
                          <Box>
                            <img
                              src={URL.createObjectURL(file)}
                              alt={file.name}
                              className={classes.imagePreview}
                            />
                            <ImagePicker
                              onChange={newFile => setFile(newFile[0])}
                              className={classes.imagePicker}
                            />
                          </Box>
                        )}
                      </Grid>
                    </Grid>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="secondary"
                      size="small"
                      className={classes.button}
                    >
                      Submit
                    </Button>
                  </form>
                )}
              </Box>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default CreateLab;
