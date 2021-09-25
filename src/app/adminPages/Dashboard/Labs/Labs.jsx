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
import CreateLab from './components/labCreationForm';
import CustomLoadingIndicator from '../../../commonComponents/customLoadingIndicator';
import ErrorAlert from '../../../commonComponents/errorAlert';
import {
  fetchLabs,
  resetAdminLabState,
} from '../../../../store/actions/admin/adminLabsActions';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function LabTable() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isLabsLoading = useSelector(state => state.adminLabs.isLabsLoading);
  const isLabsError = useSelector(state => state.adminLabs.isLabsError);
  const labsLst = useSelector(state => state.adminLabs.labs);
  const reload = useSelector(state => state.adminLabs.reloadLabs);
  useEffect(() => {
    dispatch(fetchLabs());
  }, [dispatch, reload]);
  useEffect(
    () => () => {
      dispatch(resetAdminLabState());
    },
    [dispatch],
  );
  const allLabs = labsLst.map(l => (
    <TableRow key={l.id}>
      <TableCell component="th" scope="row">
        {l.name}
      </TableCell>
      <TableCell component="th" scope="row">
        {l.department.name}
      </TableCell>
      <TableCell component="th" scope="row">
        <Button variant="contained" color="secondary">
          Add Lecturer
        </Button>
        ,
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
                  <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Lab Name</TableCell>
                        <TableCell align="left">Department</TableCell>
                        <TableCell align="right" />
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
