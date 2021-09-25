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
import RegisterLabManager from './components/labManagerRegistrationForm';
import CustomLoadingIndicator from '../../../commonComponents/customLoadingIndicator';
import ErrorAlert from '../../../commonComponents/errorAlert';
import {
  fetchLabManagers,
  resetAdminLabManagerState,
} from '../../../../store/actions/admin/adminLabManagersActions';

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

export default function LabManagerTable() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isLabManagersLoading = useSelector(
    state => state.adminLabManagers.isLabManagersLoading,
  );
  const isLabManagersError = useSelector(
    state => state.adminLabManagers.isLabManagersError,
  );
  const labManagersLst = useSelector(
    state => state.adminLabManagers.labManagers,
  );
  const reload = useSelector(state => state.adminLabManagers.reloadLabManagers);

  useEffect(() => {
    dispatch(fetchLabManagers());
  }, [dispatch, reload]);
  useEffect(
    () => () => {
      dispatch(resetAdminLabManagerState());
    },
    [dispatch],
  );

  const allLabManagers = labManagersLst.map(labManager => (
    <TableRow key={labManager.id}>
      <TableCell align="center" className={classes.row}>
        {labManager.email}
      </TableCell>
      <TableCell align="center" className={classes.row}>
        {labManager.name.trim() === '' ? 'Not Set' : labManager.name}
      </TableCell>
      <TableCell align="center" className={classes.row}>
        {labManager.lab.name}
      </TableCell>
      <TableCell align="center" className={classes.row}>
        {labManager.department.name}
      </TableCell>
      <TableCell align="center" className={classes.row}>
        <Button variant="outlined" color="primary">
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
            Lab Managers
          </Typography>
        </Zoom>
        {isLabManagersError ? (
          <ErrorAlert message="Failed to load labManagers" />
        ) : (
          <div>
            {isLabManagersLoading ? (
              <CustomLoadingIndicator minimumHeight="60vh" />
            ) : (
              <div>
                <Zoom triggerOnce>
                  <RegisterLabManager />
                </Zoom>
                <Zoom triggerOnce>
                  <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                      <TableRow>
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
                          Name
                        </TableCell>
                        <TableCell
                          align="center"
                          className={classes.table_head}
                        >
                          Laboratory
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
                          Block / Unblock
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>{allLabManagers}</TableBody>
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
