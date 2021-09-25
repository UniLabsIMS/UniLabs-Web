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
  table_head: {
    fontSize: 18,
    backgroundColor: '#404040',
    color: 'white',
  },
  row: {
    fontSize: 18,
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
      <TableCell align="center" className={classes.row}>
        {lecturer.lecturerId}
      </TableCell>
      <TableCell align="center" className={classes.row}>
        {lecturer.name.trim() === '' ? 'Not Set' : lecturer.name}
      </TableCell>
      <TableCell align="center" className={classes.row}>
        {lecturer.email}
      </TableCell>
      <TableCell align="center" className={classes.row}>
        {lecturer.department.name}
      </TableCell>
      <TableCell align="center" className={classes.row}>
        <Button variant="outlined" color="secondary">
          Block
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
                        <TableCell
                          align="center"
                          className={classes.table_head}
                        >
                          ID
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
                          Block Lecturer
                        </TableCell>
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
