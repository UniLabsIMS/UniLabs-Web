import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Zoom } from 'react-awesome-reveal';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(id, itemName, lab, dueDate, n) {
  return { id, itemName, lab, dueDate, n };
}

const rows = [
  createData('00001', 'Item_1', 'Lab1', '01/01/2022'),
  createData('04125', 'Item_1', 'Lab1', '01/01/2022'),
  createData('49242', 'Item_1', 'Lab1', '01/01/2022'),
  createData('12523', 'Item_1', 'Lab1', '01/01/2022'),
  createData('32634', 'Item_1', 'Lab1', '01/01/2022'),
];

export default function BurrowedItemsTable() {
  const classes = useStyles();

  return (
    <div className="largerContainer">
      <TableContainer component={Paper}>
        <Zoom triggerOnce>
          <Typography component="h1" variant="h4" align="center">
            Borrowed Items
          </Typography>
        </Zoom>
        <Zoom triggerOnce>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Item ID</TableCell>
                <TableCell align="right">Item Name</TableCell>
                <TableCell align="right">Lab</TableCell>
                <TableCell align="right">Due Date</TableCell>
                <TableCell align="right" />
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="right">{row.itemName}</TableCell>
                  <TableCell align="right">{row.lab}</TableCell>
                  <TableCell align="right">{row.dueDate}</TableCell>
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
