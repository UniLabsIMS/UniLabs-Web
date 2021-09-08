import {
  Button,
  CssBaseline,
  TextField,
  makeStyles,
  Typography,
  Container,
} from '@material-ui/core';
import { useState } from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

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
}));

function RegisterLecturer() {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [lecturerId, setLecturerId] = useState('');
  const [department, setDepartment] = useState('');

  const handleChange = event => {
    setDepartment(event.target.value);
  };

  const handleLogin = e => {
    e.preventDefault();
  };

  return (
    <div className="bigContainer">
      <Container component="main">
        <CssBaseline />
        <div className={classes.paper}>
          <div className={classes.loginForm}>
            <div className={classes.formLine}>
              <Typography component="h1" variant="h5">
                Register a new Lecturer
              </Typography>
            </div>
            <form className={classes.form} noValidate onSubmit={handleLogin}>
              <div className={classes.formLine}>
                <TextField
                  className={classes.texts}
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
                  //   autoFocus
                />
                <TextField
                  className={classes.texts}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="lecturerId"
                  label="Lecturer ID"
                  name="lecturerId"
                  autoComplete="lecturerId"
                  value={lecturerId}
                  onChange={e => setLecturerId(e.target.value)}
                />
              </div>
              <div className={classes.formLine}>
                <FormControl className={classes.formControl}>
                  <InputLabel id="demo-simple-select-label">
                    Department
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={department}
                    onChange={handleChange}
                  >
                    <MenuItem value={0}>CSE</MenuItem>
                    <MenuItem value={1}>ENTC</MenuItem>
                    <MenuItem value={2}>CE</MenuItem>
                    <MenuItem value={3}>ME</MenuItem>
                    <MenuItem value={4}>CPE</MenuItem>
                  </Select>
                </FormControl>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Register Lecturer
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default RegisterLecturer;
