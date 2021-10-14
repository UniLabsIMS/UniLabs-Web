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
import { Link, useParams, useLocation } from 'react-router-dom';
import { Zoom } from 'react-awesome-reveal';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import RefreshIcon from '@material-ui/icons/Refresh';
import PageWrapper from '../../commonComponents/PageWrapper';
import Navbar from '../../commonComponents/navBar';
import BreadcrumbsWrapper from '../../commonComponents/breadCrumbsWrapper';
import NewItemForm from './components/newItemForm';
import SingleItemRow from './components/singleItemRow';
import {
  fetchLabAssistantItems,
  resetLabAssistantItemsPageState,
} from '../../../store/actions/labAssistant/labAssistantItemsActions';
import {
  LAB_ASSISTANT_BASE_URL,
  LAB_ASSISTANT_DISPLAY_ITEMS_URL,
} from '../../constants';
import CustomLoadingIndicator from '../../commonComponents/customLoadingIndicator';
import ErrorAlert from '../../commonComponents/errorAlert';
import SuccessAlert from '../../commonComponents/successAlert';
import WarningAlert from '../../commonComponents/warningAlert';

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

function LabAssistantItemsPage() {
  const classes = useStyles();
  const { displayItemId } = useParams();
  const categoryId = new URLSearchParams(useLocation().search).get(
    'categoryId',
  );
  const dispatch = useDispatch();
  const isItemsLoading = useSelector(
    state => state.labAssistantItems.isItemsLoading,
  );
  const deleteItemLoading = useSelector(
    state => state.labAssistantItems.deleteItemLoading,
  );
  const deleteItemSuccess = useSelector(
    state => state.labAssistantItems.deleteItemSuccess,
  );
  const deleteItemError = useSelector(
    state => state.labAssistantItems.deleteItemError,
  );
  const isItemsError = useSelector(
    state => state.labAssistantItems.isItemsError,
  );
  const itemsLst = useSelector(state => state.labAssistantItems.items);
  const reload = useSelector(state => state.labAssistantItems.reloadItems);
  useEffect(() => {
    dispatch(fetchLabAssistantItems(displayItemId));
  }, [dispatch, reload, displayItemId]);

  useEffect(
    () => () => {
      dispatch(resetLabAssistantItemsPageState());
    },
    [dispatch],
  );
  const itemRows = itemsLst.map(item => (
    <SingleItemRow item={item} key={itemsLst.indexOf(item)} />
  ));
  return (
    <PageWrapper navBar={<Navbar />}>
      <BreadcrumbsWrapper>
        <Link to={LAB_ASSISTANT_BASE_URL} className={classes.link}>
          Categories
        </Link>
        <Link
          to={LAB_ASSISTANT_DISPLAY_ITEMS_URL.concat(`/${categoryId}`)}
          className={classes.link}
        >
          Display Items
        </Link>
        <Box fontSize="inherit">Items</Box>
      </BreadcrumbsWrapper>
      <Zoom triggerOnce>
        <Typography component="h2" variant="h4" gutterBottom align="center">
          Items{'  '}
          <RefreshIcon
            color="secondary"
            style={{ cursor: 'pointer' }}
            onClick={() => dispatch(fetchLabAssistantItems(displayItemId))}
          />
        </Typography>
      </Zoom>
      <Box m={2} />
      {isItemsError ? (
        <ErrorAlert message="Failed to load items" />
      ) : (
        <div>
          <Zoom triggerOnce>
            <NewItemForm displayItemID={displayItemId} />
          </Zoom>
          <Box m={2} />
          {deleteItemSuccess ? (
            <SuccessAlert message="Successfully deleted item" />
          ) : (
            <></>
          )}
          {deleteItemError ? (
            <ErrorAlert message="Item Deletion Failed" />
          ) : (
            <></>
          )}
          {isItemsLoading || deleteItemLoading ? (
            <CustomLoadingIndicator minimumHeight="40vh" />
          ) : (
            <div>
              {itemsLst.length === 0 ? (
                <WarningAlert message="No display Items Added" />
              ) : (
                <Paper>
                  <TableContainer className={classes.tableContainer}>
                    <Zoom triggerOnce>
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
                        <TableBody>{itemRows}</TableBody>
                      </Table>
                    </Zoom>
                  </TableContainer>
                </Paper>
              )}
            </div>
          )}
        </div>
      )}
    </PageWrapper>
  );
}

export default LabAssistantItemsPage;
