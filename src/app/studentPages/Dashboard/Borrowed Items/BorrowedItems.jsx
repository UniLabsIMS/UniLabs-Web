import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
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
import {
  fetchStudentBorrowedItems,
  resetStudentBorrowedItemsState,
} from '../../../../store/actions/student/studentBorrowedItemsActions';
import CustomLoadingIndicator from '../../../commonComponents/customLoadingIndicator';
import ErrorAlert from '../../../commonComponents/errorAlert';
import WarningAlert from '../../../commonComponents/warningAlert';

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

const BorrowedItemsTable = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const borrowedItems = useSelector(
    state => state.studentBorrowedItems.borrowedItems,
  );
  const isborrowedItemsLoading = useSelector(
    state => state.studentBorrowedItems.isborrowedItemsLoading,
  );
  const isborrowedItemsError = useSelector(
    state => state.studentBorrowedItems.isborrowedItemsError,
  );

  useEffect(() => {
    dispatch(fetchStudentBorrowedItems());
  }, [dispatch]);

  useEffect(
    () => () => {
      dispatch(resetStudentBorrowedItemsState());
    },
    [dispatch],
  );

  return (
    <Box>
      <TableContainer component={Paper}>
        <Zoom triggerOnce>
          <Typography component="h1" variant="h4" align="center">
            Borrowed Items
          </Typography>
        </Zoom>
        <Box m={5} />
        {isborrowedItemsLoading ? (
          <CustomLoadingIndicator />
        ) : (
          <Box>
            {isborrowedItemsError ? (
              <Box m={5}>
                <ErrorAlert message="Failed to load resources" />
              </Box>
            ) : (
              <Zoom triggerOnce>
                {borrowedItems.length === 0 ? (
                  <Box m={5}>
                    <WarningAlert message="No items borrowed currently" />
                  </Box>
                ) : (
                  <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell
                          align="center"
                          className={classes.table_head}
                        >
                          Item ID
                        </TableCell>
                        <TableCell
                          align="center"
                          className={classes.table_head}
                        >
                          Item Name
                        </TableCell>
                        <TableCell
                          align="center"
                          className={classes.table_head}
                        >
                          State
                        </TableCell>
                        <TableCell
                          align="center"
                          className={classes.table_head}
                        >
                          Lab
                        </TableCell>
                        <TableCell
                          align="center"
                          className={classes.table_head}
                        >
                          Due Date
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {borrowedItems.map(borrowedItem => (
                        <TableRow key={borrowedItem.id}>
                          <TableCell className={classes.row} align="center">
                            {borrowedItem.id}
                          </TableCell>

                          <TableCell className={classes.row} align="center">
                            {borrowedItem.displayItemName}
                          </TableCell>
                          <TableCell className={classes.row} align="center">
                            {borrowedItem.state}
                          </TableCell>
                          <TableCell className={classes.row} align="center">
                            {borrowedItem.labName}
                          </TableCell>
                          <TableCell className={classes.row} align="center">
                            {borrowedItem.dueDate}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </Zoom>
            )}
          </Box>
        )}
      </TableContainer>
    </Box>
  );
};
export default BorrowedItemsTable;
