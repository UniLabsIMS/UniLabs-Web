import { Grid, makeStyles, Typography, Button, Box } from '@material-ui/core';
import { Zoom } from 'react-awesome-reveal';
import { Link, useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import PageWrapper from '../../commonComponents/PageWrapper';
import Navbar from '../../commonComponents/navBar';
import DisplayItemCard from './components/DisplayItemCard';
import BreadcrumbsWrapper from '../../commonComponents/breadCrumbsWrapper';
import CustomLoadingIndicator from '../../commonComponents/customLoadingIndicator';
import ErrorAlert from '../../commonComponents/errorAlert';
import { fetchLecturerRequest } from '../../../store/actions/lecturer/lecturerRequestActions';
import { ApproveorDeclineStudentRequest } from '../../../store/actions/lecturer/lecturerApproveOrDeclineRequesrActions';
import {
  APPROVE_REQUEST,
  DECLINE_REQUEST,
  LECTURER_BASE_URL,
} from '../../constants';

const useStyles = makeStyles(theme => ({
  link: {
    textDecoration: 'none',
    color: theme.palette.secondary.main,
  },
  reasonCard: {
    maxWidth: 900,
    padding: theme.spacing(2),
    margin: 'auto',
    border: '1px solid',
    borderColor: 'grey',
    borderRadius: 10,
    marginBottom: theme.spacing(3),
  },
  mainText: {
    fontSize: 20,
    fontWeight: 500,
    letterSpacing: theme.spacing(0.1),
    textAlign: 'left',
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
    },
  },
  mainRightText: {
    fontSize: 20,
    fontWeight: 500,
    letterSpacing: theme.spacing(0.1),
    textAlign: 'right',
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
    },
  },
  reasonTitle: {
    fontSize: 20,
    fontWeight: 500,
    letterSpacing: theme.spacing(0.1),
    textAlign: 'center',
  },
  declineButton: {
    letterSpacing: theme.spacing(0.2),
    backgroundColor: 'Red',
    color: 'white',
    '&:hover': {
      backgroundColor: 'DarkRed',
    },
  },
  approveButton: {
    letterSpacing: theme.spacing(0.2),
    backgroundColor: 'Green',
    color: 'white',
    '&:hover': {
      backgroundColor: 'DarkGreen',
    },
  },
  returnBtn: {
    width: '50%',
  },
}));

function LecturerRequestViewPage() {
  const classes = useStyles();
  const history = useHistory();
  const { requestId } = useParams();
  const dispatch = useDispatch();
  const isRequestLoading = useSelector(
    state => state.lecturerRequest.isRequestLoading,
  );
  const isRequestError = useSelector(
    state => state.lecturerRequest.isRequestsError,
  );
  const request = useSelector(state => state.lecturerRequest.request);
  const reload = useSelector(state => state.lecturerRequest.reloadRequest);
  const isApprovalOrDeclineLoading = useSelector(
    state => state.lecturerApproveOrDeclineRequest.isApprovalOrDeclineLoading,
  );
  const isApprovalOrDeclineSuccess = useSelector(
    state => state.lecturerApproveOrDeclineRequest.isApprovalOrDeclineSuccess,
  );
  const isApprovalOrDeclineError = useSelector(
    state => state.lecturerApproveOrDeclineRequest.isApprovalOrDeclineError,
  );

  useEffect(() => {
    dispatch(fetchLecturerRequest(requestId));
  }, [dispatch, reload, requestId]);

  useEffect(() => {
    if (isApprovalOrDeclineSuccess) history.push(LECTURER_BASE_URL);
  }, [isApprovalOrDeclineSuccess, history]);

  const reqItems = () =>
    request.requestedDisplayItems.map(reqItem => (
      <Grid item key={reqItem.id}>
        <DisplayItemCard reqItem={reqItem} />
      </Grid>
    ));

  const handleApproval = reqState => {
    dispatch(ApproveorDeclineStudentRequest(requestId, `${reqState}dhg`));
  };

  return (
    <PageWrapper navBar={<Navbar />}>
      <BreadcrumbsWrapper>
        <Link to={LECTURER_BASE_URL} className={classes.link}>
          Home
        </Link>
        <Box fontSize="inherit">Request</Box>
      </BreadcrumbsWrapper>

      <Box>
        {request && (
          <Box>
            <Zoom triggerOnce>
              <Typography variant="h4" align="center">
                Student Request
              </Typography>
              <Box m={2} />
            </Zoom>
            <Box m={5} />
          </Box>
        )}
        {isApprovalOrDeclineError ? (
          <>
            <ErrorAlert message="Failed to approve of decline the request" />
            <Box m={2} />
          </>
        ) : (
          <Box />
        )}
        {isRequestError ? (
          <ErrorAlert message="Failed to load display items" />
        ) : (
          <Box>
            {isRequestLoading || isApprovalOrDeclineLoading ? (
              <CustomLoadingIndicator minimumHeight="60vh" />
            ) : (
              <>
                {request && (
                  <Box>
                    <Zoom triggerOnce>
                      <Box align="center" className={classes.reasonCard}>
                        <Grid container alignItems="flex-start">
                          <Grid item xs={12} sm={12} md={6}>
                            {request.studentName.length > 1 && (
                              <Typography className={classes.mainText}>
                                Student Name : {request.studentName}
                              </Typography>
                            )}
                            <Typography className={classes.mainText}>
                              Index Number : {request.studentIndex}
                            </Typography>
                            <Typography className={classes.mainText}>
                              Email : {request.student.email}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={12} md={6}>
                            <Typography className={classes.mainRightText}>
                              Lab : {request.lab.name}
                            </Typography>
                            <Typography className={classes.mainRightText}>
                              Department : {request.studentDepartment}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Box m={2} />
                        <Typography className={classes.reasonTitle}>
                          Reason
                        </Typography>

                        <Typography
                          align={
                            request.reason.length > 75 ? 'justify' : 'center'
                          }
                        >
                          {request.reason}
                        </Typography>

                        <Box m={3}>
                          <Grid container alignItems="flex-start" spacing={2}>
                            <Grid item xs={12} sm={6}>
                              <Button
                                onClick={() => {
                                  handleApproval(DECLINE_REQUEST);
                                }}
                                variant="contained"
                                fullWidth
                                className={classes.declineButton}
                              >
                                Decline
                              </Button>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Button
                                onClick={() => {
                                  handleApproval(APPROVE_REQUEST);
                                }}
                                variant="contained"
                                fullWidth
                                className={classes.approveButton}
                              >
                                Accept
                              </Button>
                            </Grid>
                          </Grid>
                        </Box>
                      </Box>
                    </Zoom>

                    <Zoom triggerOnce>
                      <Box>
                        <Box>
                          <Typography
                            variant="h4"
                            align="center"
                            color="textSecondary"
                          >
                            Requested Items
                          </Typography>
                        </Box>

                        <Grid
                          container
                          spacing={3}
                          justifyContent="space-around"
                          alignItems="stretch"
                          direction="row"
                        >
                          {reqItems()}
                        </Grid>
                      </Box>
                    </Zoom>
                  </Box>
                )}
              </>
            )}
          </Box>
        )}
      </Box>
    </PageWrapper>
  );
}

export default LecturerRequestViewPage;
