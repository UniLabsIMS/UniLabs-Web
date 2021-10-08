import { Box, Grid, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { Zoom } from 'react-awesome-reveal';
import { useDispatch, useSelector } from 'react-redux';
import LabAssistantBorrowedItemsCard from './components/borrowedItemsCard';
import BorrowedItemSearchBar from './components/borrowedItemSearchBar';
import {
  fetchLabAssistantBorrowedItems,
  resetLabAssistantBorrowedItemsState,
} from '../../../../store/actions/labAssistant/labAssistantBorrowedItemsActions';
import ErrorAlert from '../../../commonComponents/errorAlert';
import WarningAlert from '../../../commonComponents/warningAlert';
import CustomLoadingIndicator from '../../../commonComponents/customLoadingIndicator';

function BorrowedItems() {
  const isBorrowedItemsLoading = useSelector(
    state => state.labAssistantBorrowedItems.isBorrowedItemsLoading,
  );
  const isBorrowedItemsError = useSelector(
    state => state.labAssistantBorrowedItems.isBorrowedItemsError,
  );
  const reload = useSelector(
    state => state.labAssistantBorrowedItems.reloadBorrowedItems,
  );
  const dispatch = useDispatch();
  const borrowedItemsLst = useSelector(
    state => state.labAssistantBorrowedItems.borrowedItems,
  );
  const [searchKeyStudentIndexNo, setSearchKeyStudentIndexNo] = useState('');
  const borrowedItemsSearchFilteredList = borrowedItemsLst.filter(
    borrowedItem => {
      if (searchKeyStudentIndexNo !== '') {
        if (
          borrowedItem.studentIndexNumber.substr(
            0,
            searchKeyStudentIndexNo.length,
          ) === searchKeyStudentIndexNo
        ) {
          return true;
        }
        return false;
      }
      return true;
    },
  );
  const borrowedItemsDisplayList = borrowedItemsSearchFilteredList.map(
    borrowedItem => (
      <Grid item key={borrowedItem.id}>
        <LabAssistantBorrowedItemsCard borrowedItem={borrowedItem} />
      </Grid>
    ),
  );

  useEffect(() => {
    dispatch(fetchLabAssistantBorrowedItems());
  }, [dispatch, reload]);
  useEffect(
    () => () => {
      dispatch(resetLabAssistantBorrowedItemsState());
    },
    [dispatch],
  );
  if (isBorrowedItemsError) {
    return <ErrorAlert message="Failed to load resources" />;
  }
  return (
    <div>
      <Zoom triggerOnce>
        <Typography component="h2" variant="h4" gutterBottom align="center">
          Borrowed Items
        </Typography>
      </Zoom>
      <Box m={2} />
      <Zoom triggerOnce>
        <BorrowedItemSearchBar
          searchKey={searchKeyStudentIndexNo}
          onChange={setSearchKeyStudentIndexNo}
        />
      </Zoom>
      <Box m={2} />
      {isBorrowedItemsLoading ? (
        <CustomLoadingIndicator minimumHeight="40vh" />
      ) : (
        <>
          {borrowedItemsDisplayList.length === 0 ? (
            <WarningAlert message="No borrowed items available" />
          ) : (
            <Grid
              container
              spacing={3}
              justifyContent="space-around"
              alignItems="center"
              direction="row"
            >
              {borrowedItemsDisplayList}
            </Grid>
          )}
        </>
      )}
    </div>
  );
}

export default BorrowedItems;
