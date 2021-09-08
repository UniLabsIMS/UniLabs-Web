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
import RegisterStudent from './components/studentRegistrationForm';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(id, name, department, n) {
  return { id, name, department, n };
}

const rows = [
  createData(
    180001,
    'Student_1',
    'Department_1',
    <Button variant="contained" color="secondary">
      Delete
    </Button>,
  ),
  createData(
    180002,
    'Student_2',
    'Department_2',
    <Button variant="contained" color="secondary">
      Delete
    </Button>,
  ),
  createData(
    180003,
    'Student_3',
    'Department_1',
    <Button variant="contained" color="secondary">
      Delete
    </Button>,
  ),
  createData(
    180004,
    'Student_4',
    'Department_4',
    <Button variant="contained" color="secondary">
      Delete
    </Button>,
  ),
  createData(
    180005,
    'Student_5',
    'Department_3',
    <Button variant="contained" color="secondary">
      Delete
    </Button>,
  ),
  createData(
    180006,
    'Student_6',
    'Department_3',
    <Button variant="contained" color="secondary">
      Delete
    </Button>,
  ),
  createData(
    180007,
    'Student_7',
    'Department_1',
    <Button variant="contained" color="secondary">
      Delete
    </Button>,
  ),
];

export default function StudentTable() {
  const classes = useStyles();

  return (
    <div className="largerContainer">
      <TableContainer component={Paper}>
        <Zoom triggerOnce>
          <Typography component="h1" variant="h4" align="center">
            Students
          </Typography>
        </Zoom>
        <Zoom triggerOnce>
          <RegisterStudent />
        </Zoom>
        <Zoom triggerOnce>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Department</TableCell>
                <TableCell align="right" />
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="right">{row.name}</TableCell>
                  <TableCell align="right">{row.department}</TableCell>
                  <TableCell align="right">{row.n}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Zoom>
      </TableContainer>
    </div>
  );
}
