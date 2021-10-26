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
  blockUnblockStudent,
  fetchStudents,
  resetAdminStudentState,
} from '../../../../store/actions/admin/adminStudentsActions';
import DefaultPasswordWarining from '../../../commonComponents/defaultPasswordWarning';

const useStyles = makeStyles({
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
});

export default function StudentTable() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isDefaultPassword = useSelector(
    state => state.auth.user.isDefaultPassword,
  );
  const isStudentsLoading = useSelector(
    state => state.adminStudents.isStudentsLoading,
  );
  const isStudentsError = useSelector(
    state => state.adminStudents.isStudentsError,
  );
  const studentsLst = useSelector(state => state.adminStudents.students);
  const reload = useSelector(state => state.adminStudents.reloadStudents);
  const studentBlockUnblockLoading = useSelector(
    state => state.adminStudents.studentBlockUnblockLoading,
  );
  const studentBlockUnblockError = useSelector(
    state => state.adminStudents.studentBlockUnblockError,
  );

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch, reload]);
  useEffect(
    () => () => {
      dispatch(resetAdminStudentState());
    },
    [dispatch],
  );

  const handleBlockUnblock = (userID, newBlockBool) => {
    dispatch(blockUnblockStudent(userID, newBlockBool));
  };

  const allStudents = studentsLst.map(student => (
    <TableRow key={student.id}>
      <TableCell align="center" className={classes.row}>
        {student.studentId}
      </TableCell>
      <TableCell align="center" className={classes.row}>
        {student.name.trim() === '' ? 'Not Set' : student.name}
      </TableCell>
      <TableCell align="center" className={classes.row}>
        {student.email}
      </TableCell>
      <TableCell align="center" className={classes.row}>
        {student.department.name}
      </TableCell>
      <TableCell align="center" className={classes.row}>
        {student.blocked ? (
          <Button
            disabled={studentBlockUnblockLoading}
            variant="outlined"
            color="primary"
            onClick={() => handleBlockUnblock(student.id, false)}
          >
            Unblock
          </Button>
        ) : (
          <Button
            disabled={studentBlockUnblockLoading}
            variant="outlined"
            color="secondary"
            onClick={() => handleBlockUnblock(student.id, true)}
          >
            Block
          </Button>
        )}
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
        {isDefaultPassword ? <DefaultPasswordWarining /> : <div />}
        {studentBlockUnblockError ? (
          <ErrorAlert message="Student Blocking/Unblocking Failed." />
        ) : (
          <div />
        )}
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
                        <TableCell
                          align="center"
                          className={classes.table_head}
                        >
                          Student ID
                        </TableCell>
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
                          Email
                        </TableCell>
                        <TableCell
                          align="center"
                          className={classes.table_head}
                        >
                          Department
                        </TableCell>
                        <TableCell
                          align="center"
                          className={classes.table_head}
                        >
                          Block Student
                        </TableCell>
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
