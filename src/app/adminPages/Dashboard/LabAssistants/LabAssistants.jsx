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
import RegisterLabAssistant from './components/assistantRegistrationForm';
import CustomLoadingIndicator from '../../../commonComponents/customLoadingIndicator';
import ErrorAlert from '../../../commonComponents/errorAlert';
import {
  blockUnblockLabAssistant,
  fetchLabAssistants,
  resetAdminLabAssistantState,
} from '../../../../store/actions/admin/adminLabAssistantsActions';

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

export default function LabAssistantTable() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isLabAssistantsLoading = useSelector(
    state => state.adminLabAssistants.isLabAssistantsLoading,
  );
  const isLabAssistantsError = useSelector(
    state => state.adminLabAssistants.isLabAssistantsError,
  );
  const labAssistantsLst = useSelector(
    state => state.adminLabAssistants.labAssistants,
  );
  const reload = useSelector(
    state => state.adminLabAssistants.reloadLabAssistants,
  );
  const labAssistantBlockUnblockLoading = useSelector(
    state => state.adminLabAssistants.labAssistantBlockUnblockLoading,
  );
  const labAssistantBlockUnblockError = useSelector(
    state => state.adminLabAssistants.labAssistantBlockUnblockError,
  );

  useEffect(() => {
    dispatch(fetchLabAssistants());
  }, [dispatch, reload]);
  useEffect(
    () => () => {
      dispatch(resetAdminLabAssistantState());
    },
    [dispatch],
  );
  const handleBlockUnblock = (userID, newBlockBool) => {
    dispatch(blockUnblockLabAssistant(userID, newBlockBool));
  };
  const allLabAssistants = labAssistantsLst.map(labAssistant => (
    <TableRow key={labAssistant.id}>
      <TableCell align="center" className={classes.row}>
        {labAssistant.email}
      </TableCell>
      <TableCell align="center" className={classes.row}>
        {labAssistant.name.trim() === '' ? 'Not Set' : labAssistant.name}
      </TableCell>
      <TableCell align="center" className={classes.row}>
        {labAssistant.lab.name}
      </TableCell>
      <TableCell align="center" className={classes.row}>
        {labAssistant.department.name}
      </TableCell>
      <TableCell align="center" className={classes.row}>
        {labAssistant.blocked ? (
          <Button
            disabled={labAssistantBlockUnblockLoading}
            variant="outlined"
            color="primary"
            onClick={() => handleBlockUnblock(labAssistant.id, false)}
          >
            Unblock
          </Button>
        ) : (
          <Button
            disabled={labAssistantBlockUnblockLoading}
            variant="outlined"
            color="secondary"
            onClick={() => handleBlockUnblock(labAssistant.id, true)}
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
            Lab Assistants
          </Typography>
        </Zoom>
        {labAssistantBlockUnblockError ? (
          <ErrorAlert message="Lab Assistant Blocking/Unblocking Failed." />
        ) : (
          <div />
        )}
        {isLabAssistantsError ? (
          <ErrorAlert message="Failed to load labAssistants" />
        ) : (
          <div>
            {isLabAssistantsLoading ? (
              <CustomLoadingIndicator minimumHeight="60vh" />
            ) : (
              <div>
                <Zoom triggerOnce>
                  <RegisterLabAssistant />
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
                    <TableBody>{allLabAssistants}</TableBody>
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
