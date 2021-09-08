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
import RegisterLecturer from './components/lecturerRegistrationForm';

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
    'L0001',
    'Lecturer_1',
    'Department_1',
    <Button variant="contained" color="secondary">
      Delete
    </Button>,
  ),
  createData(
    'L0002',
    'Lecturer_2',
    'Department_2',
    <Button variant="contained" color="secondary">
      Delete
    </Button>,
  ),
  createData(
    'L0003',
    'Lecturer_3',
    'Department_1',
    <Button variant="contained" color="secondary">
      Delete
    </Button>,
  ),
  createData(
    'L0004',
    'Lecturer_4',
    'Department_4',
    <Button variant="contained" color="secondary">
      Delete
    </Button>,
  ),
  createData(
    'L0005',
    'Lecturer_5',
    'Department_3',
    <Button variant="contained" color="secondary">
      Delete
    </Button>,
  ),
  createData(
    'L0006',
    'Lecturer_6',
    'Department_3',
    <Button variant="contained" color="secondary">
      Delete
    </Button>,
  ),
  createData(
    'L0007',
    'Lecturer_7',
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
            Lecturers
          </Typography>
        </Zoom>
        <Zoom triggerOnce>
          <RegisterLecturer />
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
