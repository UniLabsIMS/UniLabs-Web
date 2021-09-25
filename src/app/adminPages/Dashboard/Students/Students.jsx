import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Zoom } from 'react-awesome-reveal';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import RegisterStudent from './components/studentRegistrationForm';
import CustomLoadingIndicator from '../../../commonComponents/customLoadingIndicator';
import ErrorAlert from '../../../commonComponents/errorAlert';
import {
  fetchStudents,
  resetAdminStudentState,
} from '../../../../store/actions/admin/adminStudentsActions';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function StudentTable() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isStudentsLoading = useSelector(
    state => state.adminStudents.isStudentsLoading,
  );
  const isStudentsError = useSelector(
    state => state.adminStudents.isStudentsError,
  );
  const studentsLst = useSelector(state => state.adminStudents.students);
  const reload = useSelector(state => state.adminStudents.reloadStudents);

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch, reload]);
  useEffect(
    () => () => {
      dispatch(resetAdminStudentState());
    },
    [dispatch],
  );

  const allStudents = studentsLst.map(student => (
    <TableRow key={student.id}>
      <TableCell component="th" scope="row">
        {student.studentId}
      </TableCell>
      <TableCell component="th" scope="row">
        {student.name}
      </TableCell>
      <TableCell component="th" scope="row">
        {student.department.name}
      </TableCell>
      <TableCell component="th" scope="row">
        <Button variant="contained" color="secondary">
          Delete
        </Button>
      </TableCell>
    </TableRow>
  ));

  return (
    <div className="largerContainer">
      <TableContainer component={Paper}>
        <Zoom triggerOnce>
          <Typography component="h1" variant="h4" align="center">
            Students
          </Typography>
        </Zoom>
        {isStudentsError ? (
          <ErrorAlert message="Failed to load students" />
        ) : (
          <div>
            {isStudentsLoading ? (
              <CustomLoadingIndicator minimumHeight="60vh" />
            ) : (
              <div>
                <Zoom triggerOnce>
                  <RegisterStudent />
                </Zoom>
                <Zoom triggerOnce>
                  <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell align="left">Name</TableCell>
                        <TableCell align="left">Department</TableCell>
                        <TableCell align="right" />
                      </TableRow>
                    </TableHead>
                    <TableBody>{allStudents}</TableBody>
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
