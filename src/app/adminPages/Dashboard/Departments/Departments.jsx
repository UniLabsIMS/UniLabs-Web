import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Zoom } from 'react-awesome-reveal';
import { Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import CreateDepartment from './components/departmentCreationForm';
import CustomLoadingIndicator from '../../../commonComponents/customLoadingIndicator';
import ErrorAlert from '../../../commonComponents/errorAlert';
import {
  fetchDepartments,
  resetAdminDepartmentState,
} from '../../../../store/actions/admin/adminDepartmentsActions';

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 650,
  },
  table_head: {
    fontSize: 18,
    backgroundColor: '#404040',
    color: 'white',
  },
  row: {
    fontSize: 18,
  },
}));

export default function DepartmentTable() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isDepartmentsLoading = useSelector(
    state => state.adminDepartments.isDepartmentsLoading,
  );
  const isDepartmentsError = useSelector(
    state => state.adminDepartments.isDepartmentsError,
  );
  const departmentsLst = useSelector(
    state => state.adminDepartments.departments,
  );
  const reload = useSelector(state => state.adminDepartments.reloadDepartments);
  useEffect(() => {
    dispatch(fetchDepartments());
  }, [dispatch, reload]);
  useEffect(
    () => () => {
      dispatch(resetAdminDepartmentState());
    },
    [dispatch],
  );
  const allDepartments = departmentsLst.map(dep => (
    <TableRow key={dep.name}>
      <TableCell align="center" className={classes.row}>
        {dep.name}
      </TableCell>
      <TableCell align="center" className={classes.row}>
        {dep.code}
      </TableCell>
    </TableRow>
  ));

  return (
    <div className="largerContainer">
      <TableContainer component={Paper}>
        <Zoom triggerOnce>
          <Typography component="h1" variant="h4" align="center">
            Departments
          </Typography>
        </Zoom>
        {isDepartmentsError ? (
          <ErrorAlert message="Failed to load departments" />
        ) : (
          <div>
            {isDepartmentsLoading ? (
              <CustomLoadingIndicator minimumHeight="60vh" />
            ) : (
              <div>
                <Zoom triggerOnce>
                  <CreateDepartment />
                </Zoom>
                <Zoom triggerOnce>
                  <Table className={classes.table} stickyHeader size="medium">
                    <TableHead>
                      <TableRow>
                        <TableCell
                          align="center"
                          className={classes.table_head}
                        >
                          Name
                        </TableCell>
                        <TableCell
                          align="center"
                          className={classes.table_head}
                        >
                          Department Code
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>{allDepartments}</TableBody>
                  </Table>
                </Zoom>
              </div>
            )}
          </div>
        )}
      </TableContainer>
    </div>
  );
}
