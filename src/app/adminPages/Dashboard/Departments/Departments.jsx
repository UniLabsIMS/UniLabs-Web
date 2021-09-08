import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Zoom } from 'react-awesome-reveal';
import { Typography } from '@material-ui/core';
import CreateDepartment from './components/departmentCreationForm';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name) {
  return { name };
}

const rows = [
  createData('Deparment of Computer Science & Engineering'),
  createData('Deparment of Elelctronic & Telecommunication Engineering'),
  createData('Deparment of Civil Engineering'),
  createData('Deparment of Mechanical Engineering'),
  createData('Deparment of Electrical Engineering'),
  createData('Deparment of Chemical & Process Engineering'),
];

export default function DepartmentTable() {
  const classes = useStyles();

  return (
    <div className="largerContainer">
      <TableContainer component={Paper}>
        <Zoom triggerOnce>
          <Typography component="h1" variant="h4" align="center">
            Departments
          </Typography>
        </Zoom>
        <Zoom triggerOnce>
          <CreateDepartment />
        </Zoom>
        <Zoom triggerOnce>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Zoom>
      </TableContainer>
    </div>
  );
}
