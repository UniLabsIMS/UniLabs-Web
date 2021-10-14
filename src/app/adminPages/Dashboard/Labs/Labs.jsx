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
import { useEffect, useState } from 'react';
import CreateLab from './components/labCreationForm';
import CustomLoadingIndicator from '../../../commonComponents/customLoadingIndicator';
import ErrorAlert from '../../../commonComponents/errorAlert';
import {
  fetchLabs,
  resetAdminLabState,
} from '../../../../store/actions/admin/adminLabsActions';
import AssignLecturerModal from './components/assignLecturerModal';
import WarningAlert from '../../../commonComponents/warningAlert';

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

export default function LabTable() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const isLabsLoading = useSelector(state => state.adminLabs.isLabsLoading);
  const isLabsError = useSelector(state => state.adminLabs.isLabsError);
  const labsLst = useSelector(state => state.adminLabs.labs);
  const reload = useSelector(state => state.adminLabs.reloadLabs);

  const [openAssignLecturerModal, setOpenAssignLecturerModal] = useState('');

  useEffect(() => {
    dispatch(fetchLabs());
  }, [dispatch, reload]);
  useEffect(
    () => () => {
      dispatch(resetAdminLabState());
    },
    [dispatch],
  );
  const handleModalClose = () => {
    dispatch(fetchLabs());
    setOpenAssignLecturerModal('');
  };
  const allLabs = labsLst.map(lab => (
    <TableRow key={lab.id}>
      <TableCell className={classes.row} align="center">
        {lab.name}
        {lab.assignedLecturers.length === 0 ? (
          <Typography style={{ color: 'red' }}>
            No Lecturers Assigned
          </Typography>
        ) : (
          ''
        )}
      </TableCell>
      <TableCell className={classes.row} align="center">
        {lab.department.name}
      </TableCell>
      <TableCell className={classes.row} align="center">
        <Button
          variant="outlined"
          color="primary"
          onClick={() => setOpenAssignLecturerModal(lab.id)}
        >
          Add Lecturer
        </Button>
        <AssignLecturerModal
          open={openAssignLecturerModal === lab.id}
          onClose={handleModalClose}
          assignedLecturers={lab.assignedLecturers}
        />
      </TableCell>
    </TableRow>
  ));

  return (
    <div className="largerContainer">
      <TableContainer component={Paper}>
        <Zoom triggerOnce>
          <Typography component="h1" variant="h4" align="center">
            Labs
          </Typography>
        </Zoom>
        {isLabsError ? (
          <ErrorAlert message="Failed to load labs" />
        ) : (
          <div>
            {isLabsLoading ? (
              <CustomLoadingIndicator minimumHeight="60vh" />
            ) : (
              <div>
                <Zoom triggerOnce>
                  <CreateLab />
                </Zoom>
                <Zoom triggerOnce>
                  <Table className={classes.table} stickyHeader size="medium">
                    <TableHead>
                      <TableRow>
                        <TableCell
                          align="center"
                          className={classes.table_head}
                        >
                          Lab Name
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
                          Assign Lecturers
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>{allLabs}</TableBody>
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
