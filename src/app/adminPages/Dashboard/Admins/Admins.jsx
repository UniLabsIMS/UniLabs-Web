import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import RegisterAdmin from './components/adminRegistrationForm';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, email, n) {
  return { name, email, n };
}

const rows = [
  createData('Admin_1', 'admin_1@uom.lk'),
  createData('Admin_2', 'admin_2@uom.lk'),
  createData('Admin_3', 'admin_3@uom.lk'),
  createData('Admin_4', 'admin_4@uom.lk'),
  createData('Admin_5', 'admin_5@uom.lk'),
  createData('Admin_6', 'admin_6@uom.lk'),
  createData('Admin_7', 'admin_7@uom.lk'),
];

export default function LabManagerTable() {
  const classes = useStyles();

  return (
    <div className="largerContainer">
      <TableContainer component={Paper}>
        <RegisterAdmin />
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">{row.n}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
