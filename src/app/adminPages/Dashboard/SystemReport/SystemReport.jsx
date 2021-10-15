import { Box, Typography } from '@material-ui/core';
import { Zoom } from 'react-awesome-reveal';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import ItemSummary from './components/ItemSummary';
import SystemSummary from './components/SystemSummary';
import UserSummary from './components/UserSummary';
import CustomLoadingIndicator from '../../../commonComponents/customLoadingIndicator';
import ErrorAlert from '../../../commonComponents/errorAlert';
import {
  fetchSystemReport,
  resetSystemReportState,
} from '../../../../store/actions/admin/adminSystemReportActions';

const SystemReport = () => {
  const dispatch = useDispatch();
  const isSystemReportLoading = useSelector(
    state => state.adminSystemReport.isSystemReportLoading,
  );
  const systemReportError = useSelector(
    state => state.adminSystemReport.systemReportError,
  );
  useEffect(() => {
    dispatch(fetchSystemReport());
  }, [dispatch]);

  const systemReport = useSelector(
    state => state.adminSystemReport.systemReport,
  );
  useEffect(
    () => () => {
      dispatch(resetSystemReportState());
    },
    [dispatch],
  );
  return (
    <Box>
      <Zoom triggerOnce>
        <Typography variant="h4" gutterBottom align="center">
          System Report
        </Typography>
      </Zoom>
      {isSystemReportLoading || (!systemReport && !systemReportError) ? (
        <CustomLoadingIndicator />
      ) : (
        <Box>
          {systemReportError ? (
            <ErrorAlert message="Failed to load system report" />
          ) : (
            <Box>
              <UserSummary
                totalUsers={systemReport.userCount}
                admins={systemReport.adminCount}
                students={systemReport.studentCount}
                lecturers={systemReport.lecturerCount}
                labMangers={systemReport.labManagerCount}
                labAssistants={systemReport.labAssistantCount}
              />
              <Box m={5} />
              <ItemSummary
                totalItems={systemReport.itemCount}
                availableItems={systemReport.availableItemCount}
                damagedItems={systemReport.damagedItemCount}
                borrowedItems={systemReport.borrowedItemCount}
                tempBorrowedItems={systemReport.tempBorrowedItemCount}
              />
              <Box m={5} />
              <SystemSummary
                totalDepartments={systemReport.departmentCount}
                totalLabs={systemReport.labCount}
                totalCategories={systemReport.categoryCount}
                totalDisplayItems={systemReport.displayItemCount}
                totalItems={systemReport.itemCount}
              />
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default SystemReport;
