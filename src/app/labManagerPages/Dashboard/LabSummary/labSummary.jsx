import { Box, Grid, Typography } from '@material-ui/core';
import { Zoom } from 'react-awesome-reveal';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import ItemSummary from './components/itemSummary';
import CustomLoadingIndicator from '../../../commonComponents/customLoadingIndicator';
import ErrorAlert from '../../../commonComponents/errorAlert';
import { fetchLabReport } from '../../../../store/actions/labManager/labManagerLabReportActions';
import CountCard from './components/countCard';

const LabSummary = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchLabReport());
  }, [dispatch]);

  const isLabReportLoading = useSelector(
    state => state.labManagerLabReport.isLabReportLoading,
  );
  const labReport = useSelector(state => state.labManagerLabReport.labReport);
  const labReportError = useSelector(
    state => state.labManagerLabReport.labReportError,
  );

  return (
    <div>
      <Zoom triggerOnce>
        <Typography component="h2" variant="h4" gutterBottom align="center">
          Lab Summary
        </Typography>
      </Zoom>
      <Box m={3} />
      {labReportError ? (
        <ErrorAlert message="Failed to load lab report" />
      ) : (
        <Box>
          {isLabReportLoading || !labReport ? (
            <CustomLoadingIndicator />
          ) : (
            <Box>
              <Grid
                container
                spacing={3}
                justifyContent="space-around"
                alignItems="center"
                direction="row"
              >
                <CountCard
                  title="Lab Managers Assigned"
                  count={labReport.labManagerCount}
                />
                <CountCard
                  title="Lab Assistants Assigned"
                  count={labReport.labAssistantCount}
                />
                <CountCard
                  title="Total Categories"
                  count={labReport.categoryCount}
                />
                <CountCard
                  title="Total Display Items"
                  count={labReport.displayItemCount}
                />
                <CountCard
                  title="Total Requests"
                  count={labReport.totalRequestCount}
                />
                <CountCard
                  title="Pending Requests"
                  count={labReport.pendingRequestCount}
                />
              </Grid>

              <Box m={7} />

              <ItemSummary
                totalItems={labReport.itemCount}
                availableItems={labReport.availableItemCount}
                damagedItems={labReport.damagedItemCount}
                borrowedItems={labReport.borrowedItemCount}
                tempBorrowedItems={labReport.tempBorrowedItemCount}
              />
            </Box>
          )}
        </Box>
      )}
    </div>
  );
};

export default LabSummary;
