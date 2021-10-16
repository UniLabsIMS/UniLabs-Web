import {
  Box,
  FormControl,
  Grid,
  makeStyles,
  MenuItem,
  Select,
  Typography,
} from '@material-ui/core';
import { Zoom } from 'react-awesome-reveal';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import StudentRequestCard from './components/StudentRequestCard';
import CustomLoadingIndicator from '../../../commonComponents/customLoadingIndicator';
import ErrorAlert from '../../../commonComponents/errorAlert';
import { fetchLecturerRequests } from '../../../../store/actions/lecturer/lecturerRequestsActions';
import LecturerPermittedLab from '../../../../models/lecturerPermittedLab';
import WarningAlert from '../../../commonComponents/warningAlert';

const useStyles = makeStyles(theme => ({
  link: {
    textDecoration: 'none',
    color: theme.palette.secondary.main,
  },
  container: {
    maxWidth: 900,
  },
  formControl: {
    width: '30%',
    [theme.breakpoints.down('sm')]: {
      width: '90%',
    },
  },
  select: {
    fontSize: 18,
  },
  selectLabel: {
    fontSize: 22,
  },
}));

function StudentRequestsPage() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [filterLabId, setFilterLabId] = useState('');

  const isRequestsLoading = useSelector(
    state => state.lecturerRequests.isRequestsLoading,
  );
  const isRequestsError = useSelector(
    state => state.lecturerRequests.isRequestsError,
  );
  const lecturerReqLst = useSelector(state => state.lecturerRequests.requests);
  const lecturer = useSelector(state => state.auth.user);
  let permittedLabs = [];
  if (lecturer.otherDetails.permitted_labs) {
    permittedLabs = lecturer.otherDetails.permitted_labs.map(
      lab => new LecturerPermittedLab(lab),
    );
  }

  const reload = useSelector(state => state.lecturerRequests.reloadRequests);
  useEffect(() => {
    dispatch(fetchLecturerRequests());
  }, [dispatch, reload]);

  const filteredRequests = lecturerReqLst.filter(studentReq => {
    if (filterLabId.length > 0) {
      if (studentReq.labId !== filterLabId) return false;
    }
    return true;
  });

  const requests = filteredRequests.map(studentReq => (
    <Grid item key={studentReq.id}>
      <StudentRequestCard studentReq={studentReq} />
    </Grid>
  ));

  const possibleLabsToSelectFrom = permittedLabs.map(lab => (
    <MenuItem key={lab.id} value={lab.id}>
      {lab.name}
    </MenuItem>
  ));
  possibleLabsToSelectFrom.unshift(
    <MenuItem key="All" value="">
      All Labs
    </MenuItem>,
  );

  return (
    <Box align="center">
      <Zoom triggerOnce>
        <Typography component="h2" variant="h4" gutterBottom align="center">
          New Requests
        </Typography>
      </Zoom>
      <Box m={2} />
      {isRequestsError ? (
        <ErrorAlert message="Failed to load requests" />
      ) : (
        <Box>
          <Zoom triggerOnce>
            <FormControl className={classes.formControl}>
              <Typography className={classes.selectLabel}>
                Filter by Lab
              </Typography>
              <Select
                displayEmpty
                id="student-labs-department-select"
                value={filterLabId}
                onChange={e => setFilterLabId(e.target.value)}
                className={classes.select}
              >
                {possibleLabsToSelectFrom}
              </Select>
            </FormControl>
          </Zoom>
          <Box m={5} />

          <Box>
            {isRequestsLoading ? (
              <CustomLoadingIndicator minimumHeight="60vh" />
            ) : (
              <Box>
                {requests.length === 0 ? (
                  <Zoom triggerOnce>
                    <WarningAlert message="No New Requests" />
                  </Zoom>
                ) : (
                  <Box className={classes.container}>{requests}</Box>
                )}
              </Box>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default StudentRequestsPage;
