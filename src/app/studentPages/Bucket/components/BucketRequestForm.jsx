import {
  Button,
  CssBaseline,
  TextField,
  makeStyles,
  Container,
} from '@material-ui/core';
import { useState } from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { addRequest } from '../../../../store/actions/student/studentBucketActions';

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
  requestForm: {
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
    width: '86%',
    marginRight: theme.spacing(5),
    marginLeft: theme.spacing(5),
  },
  buttons: {
    width: '40%',
  },
}));

const BucketRequestForm = ({ bucketItems }) => {
  const classes = useStyles();
  const { labId } = useParams();
  const [reason, setReason] = useState('');
  const [lecturer, setLecturer] = useState('');
  const dispatch = useDispatch();
  const labLecturers = useSelector(state => state.studentLabBucket.lecturers);
  const lecturerSelectData = labLecturers.map(lec => (
    <MenuItem key={lec.id} value={lec.id}>
      {lec.email}
    </MenuItem>
  ));

  const handleChange = event => {
    setLecturer(event.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(addRequest(lecturer, labId, reason, bucketItems));
  };

  return (
    <div className="bigContainer">
      <Container component="main">
        <CssBaseline />
        <div className={classes.paper}>
          <div className={classes.requestForm}>
            <form className={classes.form} onSubmit={handleSubmit}>
              <div className={classes.formLine}>
                <TextField
                  className={classes.texts}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="reason"
                  label="Reason"
                  name="reason"
                  autoComplete="reason"
                  value={reason}
                  onChange={e => setReason(e.target.value)}
                />
              </div>
              <div className={classes.formLine}>
                <FormControl className={classes.formControl}>
                  <InputLabel id="demo-simple-select-label">
                    Lecturer
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    required
                    value={lecturer}
                    onChange={handleChange}
                  >
                    {lecturerSelectData}
                  </Select>
                </FormControl>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Place Request
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
};
BucketRequestForm.propTypes = {
  bucketItems: PropTypes.arrayOf(PropTypes.any).isRequired,
};
export default BucketRequestForm;
