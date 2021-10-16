import {
  Box,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  Typography,
} from '@material-ui/core';
import { Zoom } from 'react-awesome-reveal';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import ItemSummary from './components/ItemSummary';
import SystemSummary from './components/SystemSummary';
import UserSummary from './components/UserSummary';
import CustomLoadingIndicator from '../../../commonComponents/customLoadingIndicator';
import ErrorAlert from '../../../commonComponents/errorAlert';
import {
  fetchSystemReport,
  resetSystemReportState,
} from '../../../../store/actions/admin/adminSystemReportActions';
import LabSummary from './components/LabSummary';
import WarningAlert from '../../../commonComponents/warningAlert';

const useStyles = makeStyles(theme => ({
  form: {
    width: '80%',
    marginTop: theme.spacing(1),
  },
  formControl: {
    width: '30%',
  },
  select: {
    fontSize: 24,
  },
  selectLabel: {
    fontSize: 24,
  },
}));

const SystemReport = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

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
  const isSystemReportLoading = useSelector(
    state => state.adminSystemReport.isSystemReportLoading,
  );
  const systemReportError = useSelector(
    state => state.adminSystemReport.systemReportError,
  );
  const isLabReportLoading = useSelector(
    state => state.adminSystemReport.isLabReportLoading,
  );
  const labs = useSelector(state => state.adminSystemReport.labs);
  const [selectedLabID, setSelectedLabID] = useState('');

  const possibleMenuItemsToSelect = labs.map(lab => (
    <MenuItem key={lab.id} value={lab.id}>
      {`${lab.department.code} - ${lab.name}`}
    </MenuItem>
  ));
  return (
    <Box align="center">
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
                totalRequests={systemReport.totalRequestCount}
                totalPendingRequests={systemReport.pendingRequestCount}
              />
              <Box m={5} />
              <Typography variant="h4" align="center">
                Lab Summary
              </Typography>
              <Typography variant="h6" align="center" color="secondary">
                Please Select a Lab to Load the Lab Report
              </Typography>
              <Box m={3} />
              <FormControl className={classes.formControl}>
                <InputLabel
                  id="lab-report-lab-select-label"
                  className={classes.selectLabel}
                >
                  Select a Lab
                </InputLabel>
                <Select
                  disabled={isLabReportLoading}
                  labelId="lab-report-lab-select-label"
                  id="lab-report-lab-select"
                  value={selectedLabID}
                  onChange={e => setSelectedLabID(e.target.value)}
                  className={classes.select}
                >
                  {possibleMenuItemsToSelect}
                </Select>
              </FormControl>
              <Box m={5} />
              {selectedLabID.length > 0 ? (
                <LabSummary labId={selectedLabID} />
              ) : (
                <WarningAlert message="No lab selected" />
              )}
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default SystemReport;
