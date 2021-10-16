import { Grid, makeStyles, Typography } from '@material-ui/core';
import { Zoom } from 'react-awesome-reveal';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import StudentRequestCard from './components/StudentRequestCard';
import CustomLoadingIndicator from '../../../commonComponents/customLoadingIndicator';
import ErrorAlert from '../../../commonComponents/errorAlert';
import { fetchLecturerRequests } from '../../../../store/actions/lecturer/lecturerRequestsActions';

const useStyles = makeStyles(theme => ({
  link: {
    textDecoration: 'none',
    color: theme.palette.secondary.main,
  },
  cards: {
    width: '100%',
    borderRadius: '5',
  },
}));

function StudentRequestsPage() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isRequestsLoading = useSelector(
    state => state.lecturerRequests.isRequestsLoading,
  );
  const isRequestsError = useSelector(
    state => state.lecturerRequests.isRequestsError,
  );
  const lecturerReqLst = useSelector(state => state.lecturerRequests.requests);
  const reload = useSelector(state => state.lecturerRequests.reloadRequests);
  useEffect(() => {
    dispatch(fetchLecturerRequests());
  }, [dispatch, reload]);

  const requests = lecturerReqLst.map(studentReq => (
    <Grid item key={studentReq.id}>
      <StudentRequestCard studentReq={studentReq} />
    </Grid>
  ));

  return (
    <div>
      <Zoom triggerOnce>
        <Typography component="h2" variant="h4" gutterBottom align="center">
          All Student Requests
        </Typography>
      </Zoom>
      {isRequestsError ? (
        <ErrorAlert message="Failed to load requests" />
      ) : (
        <div>
          {isRequestsLoading ? (
            <CustomLoadingIndicator minimumHeight="60vh" />
          ) : (
            <div className={classes.cards}>{requests}</div>
          )}
        </div>
      )}
    </div>
  );
}

export default StudentRequestsPage;
