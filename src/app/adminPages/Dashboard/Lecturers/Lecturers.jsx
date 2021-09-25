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
import RegisterLecturer from './components/lecturerRegistrationForm';
import CustomLoadingIndicator from '../../../commonComponents/customLoadingIndicator';
import ErrorAlert from '../../../commonComponents/errorAlert';
import {
  fetchLecturers,
  resetAdminLecturerState,
} from '../../../../store/actions/admin/adminLecturersActions';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function LecturerTable() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isLecturersLoading = useSelector(
    state => state.adminLecturers.isLecturersLoading,
  );
  const isLecturersError = useSelector(
    state => state.adminLecturers.isLecturersError,
  );
  const lecturersLst = useSelector(state => state.adminLecturers.lecturers);
  const reload = useSelector(state => state.adminLecturers.reloadLecturers);

  useEffect(() => {
    dispatch(fetchLecturers());
  }, [dispatch, reload]);
  useEffect(
    () => () => {
      dispatch(resetAdminLecturerState());
    },
    [dispatch],
  );

  const allLecturers = lecturersLst.map(lecturer => (
    <TableRow key={lecturer.id}>
      <TableCell component="th" scope="row">
        {lecturer.lecturerId}
      </TableCell>
      <TableCell component="th" scope="row">
        {lecturer.name}
      </TableCell>
      <TableCell component="th" scope="row">
        {lecturer.department.name}
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
            Lecturers
          </Typography>
        </Zoom>
        {isLecturersError ? (
          <ErrorAlert message="Failed to load lecturers" />
        ) : (
          <div>
            {isLecturersLoading ? (
              <CustomLoadingIndicator minimumHeight="60vh" />
            ) : (
              <div>
                <Zoom triggerOnce>
                  <RegisterLecturer />
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
                    <TableBody>{allLecturers}</TableBody>
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
