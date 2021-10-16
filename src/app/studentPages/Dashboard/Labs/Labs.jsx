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
import LabCard from './components/labCard';
import CustomLoadingIndicator from '../../../commonComponents/customLoadingIndicator';
import ErrorAlert from '../../../commonComponents/errorAlert';
import { fetchLabsStudent } from '../../../../store/actions/student/studentLabsActions';
import WarningAlert from '../../../commonComponents/warningAlert';

const useStyles = makeStyles(theme => ({
  gridItem: {},
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

function Labs() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [selectedDepartmentID, setSelectedDepartmentID] = useState('');

  const isLabsLoading = useSelector(state => state.studentLabs.isLabsLoading);
  const isLabsError = useSelector(state => state.studentLabs.isLabsError);
  const labsLst = useSelector(state => state.studentLabs.labs);
  const departmentLst = useSelector(state => state.studentLabs.departments);
  const reload = useSelector(state => state.studentLabs.reloadLabs);

  useEffect(() => {
    dispatch(fetchLabsStudent());
  }, [dispatch, reload]);

  const possibleDepartmentsToSelect = departmentLst.map(department => (
    <MenuItem key={department.id} value={department.id}>
      {department.name}
    </MenuItem>
  ));
  possibleDepartmentsToSelect.unshift(
    <MenuItem key="All" value="">
      All Departments
    </MenuItem>,
  );

  const filteredLabsByDepartment = labsLst.filter(lab => {
    if (selectedDepartmentID.length > 0) {
      if (lab.department.id !== selectedDepartmentID) return false;
    }
    return true;
  });

  const labs = filteredLabsByDepartment.map(lab => (
    <Grid item key={lab.id} className={classes.gridItem}>
      <LabCard lab={lab} />
    </Grid>
  ));

  return (
    <Box align="center">
      <Zoom triggerOnce>
        <Typography component="h2" variant="h4" gutterBottom align="center">
          Laboratories
        </Typography>
      </Zoom>
      <Box m={3} />
      <Zoom triggerOnce>
        <FormControl className={classes.formControl}>
          <Typography className={classes.selectLabel}>
            Filter by Department
          </Typography>
          <Select
            displayEmpty
            id="student-labs-department-select"
            value={selectedDepartmentID}
            onChange={e => setSelectedDepartmentID(e.target.value)}
            className={classes.select}
          >
            {possibleDepartmentsToSelect}
          </Select>
        </FormControl>
      </Zoom>
      <Box m={5} />
      {isLabsError ? (
        <ErrorAlert message="Failed to load labs" />
      ) : (
        <Box>
          {isLabsLoading ? (
            <CustomLoadingIndicator minimumHeight="60vh" />
          ) : (
            <Box>
              {labs.length === 0 ? (
                <Zoom triggerOnce>
                  <WarningAlert message="No Labs Available." />
                </Zoom>
              ) : (
                <Grid
                  container
                  spacing={3}
                  justifyContent="space-around"
                  alignItems="center"
                  direction="row"
                >
                  {labs}
                </Grid>
              )}
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}

export default Labs;
