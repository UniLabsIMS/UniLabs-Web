import { makeStyles } from '@material-ui/core/styles';
import { Zoom } from 'react-awesome-reveal';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import RegisterAdmin from './components/adminRegistrationForm';
import CustomLoadingIndicator from '../../../commonComponents/customLoadingIndicator';
import ErrorAlert from '../../../commonComponents/errorAlert';
import {
  fetchAdmins,
  resetAdminAdminState,
} from '../../../../store/actions/admin/adminAdminsActions';

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

export default function AdminTable() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isAdminsLoading = useSelector(
    state => state.adminAdmins.isAdminsLoading,
  );
  const isAdminsError = useSelector(state => state.adminAdmins.isAdminsError);
  const adminsLst = useSelector(state => state.adminAdmins.admins);
  const reload = useSelector(state => state.adminAdmins.reloadAdmins);

  useEffect(() => {
    dispatch(fetchAdmins());
  }, [dispatch, reload]);
  useEffect(
    () => () => {
      dispatch(resetAdminAdminState());
    },
    [dispatch],
  );

  const allAdmins = adminsLst.map(admin => (
    <TableRow key={admin.id}>
      <TableCell align="center" className={classes.row}>
        {admin.email}
      </TableCell>
      <TableCell align="center" className={classes.row}>
        {admin.name.trim() === '' ? 'Not Set' : admin.name}
      </TableCell>
      <TableCell align="center" className={classes.row}>
        {admin.contactNumber.trim() === '' ? 'Not Set' : admin.contactNumber}
      </TableCell>
    </TableRow>
  ));

  return (
    <div className="largerContainer">
      <TableContainer component={Paper}>
        <Zoom triggerOnce>
          <Typography component="h1" variant="h4" align="center">
            Admins
          </Typography>
        </Zoom>
        {isAdminsError ? (
          <ErrorAlert message="Failed to load admins" />
        ) : (
          <div>
            {isAdminsLoading ? (
              <CustomLoadingIndicator minimumHeight="60vh" />
            ) : (
              <div>
                <Zoom triggerOnce>
                  <RegisterAdmin />
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
                          Contact Number
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>{allAdmins}</TableBody>
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
