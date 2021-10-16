import {
  Grid,
  makeStyles,
  Typography,
  Button,
  Card,
  CardContent,
  Box,
} from '@material-ui/core';
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
import SuccessAlert from '../../commonComponents/successAlert';

const useStyles = makeStyles(theme => ({
  expenseCard: {
    padding: theme.spacing(1),
    paddingTop: theme.spacing(1),
    margin: theme.spacing(0.5),
  },
  reasonBox: {
    display: 'flex',
    alignItems: 'left',
  },
  content: {
    margin: theme.spacing(0),
    padding: theme.spacing(0),
    marginLeft: theme.spacing(4),
  },
  btnContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'left',
  },
  returnBtnContainer: {
    padding: theme.spacing(3),
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  buttons: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
  },
  link: {
    color: theme.palette.secondary.main,
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
  const lecturerReqLstofStudent = useSelector(
    state => state.lecturerRequest.request,
  );
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
  }, [dispatch, reload, requestId, isApprovalOrDeclineSuccess]);

  const reqItems = () =>
    lecturerReqLstofStudent.requestedDisplayItems.map(reqItem => (
      <Grid item key={reqItem.id}>
        <DisplayItemCard reqItem={reqItem} />
      </Grid>
    ));

  const handleApproval = reqState => {
    dispatch(ApproveorDeclineStudentRequest(requestId, reqState));
    // history.push('/lecturer');
  };
  const goback = () => {
    history.push('/lecturer');
  };

  return (
    <PageWrapper navBar={<Navbar />}>
      <BreadcrumbsWrapper>
        <Link to="/lecturer" className={classes.link}>
          Home
        </Link>
        <Box fontSize="inherit">Request</Box>
      </BreadcrumbsWrapper>
      {isApprovalOrDeclineSuccess ? (
        <>
          <SuccessAlert message="Successful!" />
          <div className={classes.returnBtnContainer}>
            <Button
              onClick={() => {
                goback();
              }}
              variant="contained"
              color="secondary"
              className={classes.buttons}
            >
              Return to Requests page
            </Button>
          </div>
          <Box m={2} />
        </>
      ) : (
        <>
          {lecturerReqLstofStudent && (
            <div>
              <Zoom triggerOnce>
                <Typography
                  component="h2"
                  variant="h4"
                  gutterBottom
                  align="center"
                >
                  {lecturerReqLstofStudent.student.student_id}&apos;s Request
                </Typography>
              </Zoom>
              {/* <LecturerRequestViewPage req={req} viewAllReqs={viewAllReqs} /> */}
            </div>
          )}
          {isApprovalOrDeclineError ? (
            <>
              <ErrorAlert message="Failed to approve of decline the request" />
              <Box m={2} />
            </>
          ) : (
            <div />
          )}
          {isRequestError ? (
            <ErrorAlert message="Failed to load display items" />
          ) : (
            <div>
              {isRequestLoading || isApprovalOrDeclineLoading ? (
                <CustomLoadingIndicator minimumHeight="60vh" />
              ) : (
                <>
                  {lecturerReqLstofStudent && (
                    <>
                      <Zoom triggerOnce>
                        <Card className={classes.expenseCard}>
                          <CardContent className={classes.content}>
                            <div className={classes.reasonBox}>
                              <Typography
                                gutterBottom
                                variant="h4"
                                component="h2"
                                align="center"
                              >
                                Lab
                              </Typography>
                            </div>
                          </CardContent>
                          <CardContent className={classes.content}>
                            <div className={classes.reasonBox}>
                              <Typography
                                gutterBottom
                                variant="h6"
                                component="h2"
                                align="justify"
                                className={classes.lines}
                              >
                                {lecturerReqLstofStudent.lab.name}
                              </Typography>
                            </div>
                          </CardContent>
                          <CardContent className={classes.content}>
                            <div className={classes.reasonBox}>
                              <Typography
                                gutterBottom
                                variant="h4"
                                component="h2"
                                align="center"
                              >
                                Reason
                              </Typography>
                            </div>
                          </CardContent>
                          <CardContent className={classes.content}>
                            <div className={classes.reasonBox}>
                              <Typography
                                gutterBottom
                                variant="h6"
                                component="h2"
                                align="justify"
                                className={classes.lines}
                              >
                                {lecturerReqLstofStudent.reason}
                              </Typography>
                            </div>
                            <div className={classes.btnContainer}>
                              <Button
                                onClick={() => {
                                  handleApproval('Approved');
                                }}
                                variant="contained"
                                color="secondary"
                                className={classes.buttons}
                              >
                                Accept
                              </Button>
                              <Button
                                onClick={() => {
                                  handleApproval('Declined');
                                }}
                                variant="contained"
                                color="secondary"
                                className={classes.buttons}
                              >
                                Decline
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </Zoom>

                      <Zoom triggerOnce>
                        <Card className={classes.expenseCard}>
                          <CardContent className={classes.content}>
                            <div className={classes.reasonBox}>
                              <Typography
                                gutterBottom
                                variant="h4"
                                component="h2"
                                align="center"
                              >
                                Requested Items
                              </Typography>
                            </div>
                          </CardContent>

                          <Grid
                            container
                            spacing={3}
                            justifyContent="space-around"
                            alignItems="stretch"
                            direction="row"
                          >
                            {reqItems()}
                          </Grid>
                        </Card>
                      </Zoom>
                    </>
                  )}
                </>
              )}
            </div>
          )}
        </>
      )}
      {/* </>
          )}
        </div>
      )} */}
    </PageWrapper>
  );
}

export default LecturerRequestViewPage;
