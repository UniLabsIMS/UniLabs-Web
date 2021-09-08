import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import RegisterLabAssitant from './components/assistantRegistrationForm';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, lab, department, n) {
  return { name, lab, department, n };
}

const rows = [
  createData(
    'LabAssistant_1',
    'Lab_1',
    'CSE',
    <Button variant="contained" color="secondary">
      Delete
    </Button>,
  ),
  createData(
    'LabAssistant_2',
    'Lab_3',
    'ENTC',
    <Button variant="contained" color="secondary">
      Delete
    </Button>,
  ),
  createData(
    'LabAssistant_3',
    'Lab_1',
    'CSE',
    <Button variant="contained" color="secondary">
      Delete
    </Button>,
  ),
  createData(
    'LabAssistant_4',
    'Lab_5',
    'ME',
    <Button variant="contained" color="secondary">
      Delete
    </Button>,
  ),
  createData(
    'LabAssistant_5',
    'Lab_4',
    'CE',
    <Button variant="contained" color="secondary">
      Delete
    </Button>,
  ),
  createData(
    'LabAssistant_6',
    'Lab_4',
    'CE',
    <Button variant="contained" color="secondary">
      Delete
    </Button>,
  ),
  createData(
    'LabAssistant_7',
    'Lab_2',
    'CSE',
    <Button variant="contained" color="secondary">
      Delete
    </Button>,
  ),
];

export default function LabManagerTable() {
  const classes = useStyles();

  return (
    <div className="largerContainer">
      <TableContainer component={Paper}>
        <RegisterLabAssitant />
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Laboratory</TableCell>
              <TableCell align="right">Department</TableCell>
              <TableCell align="right" />
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.lab}</TableCell>
                <TableCell align="right">{row.department}</TableCell>
                <TableCell align="right">{row.n}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
