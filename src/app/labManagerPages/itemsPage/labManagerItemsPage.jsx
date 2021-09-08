import {
  Box,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import PageWrapper from '../../commonComponents/PageWrapper';
import Navbar from '../../commonComponents/navBar';
import BreadcrumbsWrapper from '../../commonComponents/breadCrumbsWrapper';
import SingleItemRow from './components/singleItemRow';
import NewItemForm from './components/newItemForm';

const useStyles = makeStyles(theme => ({
  link: {
    textDecoration: 'none',
    color: theme.palette.secondary.main,
  },
  row_height: {
    height: theme.spacing(4),
  },
  row: {
    fontSize: 24,
    backgroundColor: theme.palette.primary.main,
    color: 'white',
  },
}));

function LabManagerItemsPage() {
  const classes = useStyles();
  return (
    <PageWrapper navBar={<Navbar />}>
      <BreadcrumbsWrapper>
        <Link to="/lab_manager" className={classes.link}>
          Categories
        </Link>
        <Link to="/lab_manager/category/123" className={classes.link}>
          Display Items
        </Link>
        <Box fontSize="inherit">Items</Box>
      </BreadcrumbsWrapper>
      <Typography component="h2" variant="h4" gutterBottom align="center">
        Items
      </Typography>
      <Box m={2} />
      <NewItemForm />
      <Box m={2} />
      <Paper>
        <TableContainer className={classes.tableContainer}>
          <Table stickyHeader size="medium">
            <TableHead>
              <TableRow className={classes.row_height}>
                <TableCell align="center" className={classes.row}>
                  Item ID
                </TableCell>
                <TableCell align="center" className={classes.row}>
                  State
                </TableCell>
                <TableCell align="center" className={classes.row}>
                  Added On
                </TableCell>
                <TableCell align="center" className={classes.row}>
                  Download Barcode
                </TableCell>
                <TableCell align="center" className={classes.row}>
                  Delete
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(item => (
                <SingleItemRow item={item} key={item} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </PageWrapper>
  );
}

export default LabManagerItemsPage;
