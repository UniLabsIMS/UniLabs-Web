import { Grid, Typography, Box, makeStyles, Paper } from '@material-ui/core';
import { Zoom } from 'react-awesome-reveal';
import Chart from 'react-google-charts';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CountCard from './CountCard';
import { fetchLabReport } from '../../../../../store/actions/admin/adminSystemReportActions';
import CustomLoadingIndicator from '../../../../commonComponents/customLoadingIndicator';
import ErrorAlert from '../../../../commonComponents/errorAlert';
import StrechedCountCard from './StrechedCountCard';

const useStyles = makeStyles(theme => ({
  graphCard: {
    border: '0.5px solid',
    borderColor: theme.palette.primary.main,
    paddingTop: theme.spacing(1),
    marginTop: theme.spacing(2),
  },
}));
const LabSummary = ({ labId }) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchLabReport(labId));
  }, [dispatch, labId]);

  const isLabReportLoading = useSelector(
    state => state.adminSystemReport.isLabReportLoading,
  );
  const labReport = useSelector(state => state.adminSystemReport.labReport);

  const labReportError = useSelector(
    state => state.adminSystemReport.labReportError,
  );

  if (isLabReportLoading || (!labReport && !labReportError)) {
    return <CustomLoadingIndicator minimumHeight="5vh" />;
  }
  if (labReportError) {
    return <ErrorAlert message="Failed to load lab report" />;
  }
  const labStatCards = [];
  labStatCards.push(
    <CountCard
      title="Total Items"
      key="Total Items"
      count={labReport.itemCount}
    />,
  );
  labStatCards.push(
    <CountCard
      title="Available"
      key="Available"
      count={labReport.availableItemCount}
      total={labReport.itemCount}
      showPercentage
    />,
  );
  labStatCards.push(
    <CountCard
      title="Damaged"
      key="Damaged"
      count={labReport.damagedItemCount}
      total={labReport.itemCount}
      showPercentage
    />,
  );
  labStatCards.push(
    <CountCard
      title="Borrowed"
      key="Borrowed"
      count={labReport.borrowedItemCount}
      total={labReport.itemCount}
      showPercentage
    />,
  );
  labStatCards.push(
    <CountCard
      title="Temporarily Borrowed"
      key="Temporarily Borrowed"
      count={labReport.tempBorrowedItemCount}
      total={labReport.itemCount}
      showPercentage
    />,
  );
  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item md={12} lg={6}>
          <Grid
            container
            spacing={3}
            justifyContent="space-around"
            alignItems="center"
            direction="row"
          >
            {labStatCards}
          </Grid>
        </Grid>
        <Grid item md={12} lg={6}>
          <Zoom triggerOnce>
            <Paper align="center" m={2} className={classes.graphCard}>
              <Typography variant="h5" align="center">
                Lab Summary
              </Typography>
              <Chart
                width="100%"
                height="395px"
                chartType="PieChart"
                loader={<div>Loading Chart</div>}
                data={[
                  ['Item State', 'Count'],
                  [
                    'Temporally Borrowed Items',
                    labReport.tempBorrowedItemCount,
                  ],
                  ['Damaged Items', labReport.damagedItemCount],
                  ['Borrowed Items', labReport.borrowedItemCount],
                  ['Available Items', labReport.availableItemCount],
                ]}
                options={{
                  legend: { position: 'none' },
                  animation: {
                    startup: true,
                    easing: 'linear',
                    duration: 1500,
                  },
                  titleTextStyle: {
                    fontSize: 24,
                  },
                  pieHole: 0.4,
                }}
              />
            </Paper>
          </Zoom>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={3}
        justifyContent="space-around"
        alignItems="center"
        direction="row"
      >
        <StrechedCountCard
          title="Lab Managers"
          count={labReport.labManagerCount}
        />
        <StrechedCountCard
          title="Lab Assistants"
          count={labReport.labAssistantCount}
        />
      </Grid>
    </Box>
  );
};
LabSummary.propTypes = {
  labId: PropTypes.string.isRequired,
};
export default LabSummary;
