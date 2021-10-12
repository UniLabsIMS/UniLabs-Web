import { Box, Grid, Typography } from '@material-ui/core';
import { Zoom } from 'react-awesome-reveal';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import TempBorrowedItemSearchBar from './components/tempBorrowedSearchBar';
import LabAssistantTempBorrowedItemsCard from './components/tempBorrowedItemsCard';
import ErrorAlert from '../../../commonComponents/errorAlert';
import {
  fetchLabAssistantTempBorrowedItems,
  resetLabAssistantTempBorrowedItemsState,
} from '../../../../store/actions/labAssistant/labAssistantTempBorrowedActions';
import CustomLoadingIndicator from '../../../commonComponents/customLoadingIndicator';
import WarningAlert from '../../../commonComponents/warningAlert';

function TemporaryBorrowedItems() {
  const isTempBorrowedItemsLoading = useSelector(
    state => state.labAssistantTempBorrowedItems.isTempBorrowedItemsLoading,
  );
  const isBorrowedItemsError = useSelector(
    state => state.labAssistantTempBorrowedItems.isTempBorrowedItemsError,
  );
  const reload = useSelector(
    state => state.labAssistantTempBorrowedItems.reloadTempBorrowedItems,
  );
  const dispatch = useDispatch();
  const borrowedItemsLst = useSelector(
    state => state.labAssistantTempBorrowedItems.tempBorrowedItems,
  );
  const [searchKeyStudentIndexNo, setSearchKeyStudentIndexNo] = useState('');
  const tempBorrowedItemsSearchFilteredList = borrowedItemsLst.filter(
    tempBorrowedItem => {
      if (searchKeyStudentIndexNo !== '') {
        if (
          tempBorrowedItem.studentIndexNumber.substr(
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
  const tempBorrowedItemsDisplayList = tempBorrowedItemsSearchFilteredList.map(
    tempborrowedItem => (
      <Grid item key={tempborrowedItem.id}>
        <LabAssistantTempBorrowedItemsCard
          tempBorrowedItem={tempborrowedItem}
        />
      </Grid>
    ),
  );
  useEffect(() => {
    dispatch(fetchLabAssistantTempBorrowedItems());
  }, [dispatch, reload]);
  useEffect(
    () => () => {
      dispatch(resetLabAssistantTempBorrowedItemsState());
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
          Temporarily Borrowed Items
        </Typography>
      </Zoom>
      <Box m={2} />
      <Zoom triggerOnce>
        <TempBorrowedItemSearchBar
          searchKey={searchKeyStudentIndexNo}
          onChange={setSearchKeyStudentIndexNo}
        />
      </Zoom>
      <Box m={2} />
      {isTempBorrowedItemsLoading ? (
        <CustomLoadingIndicator minimumHeight="40vh" />
      ) : (
        <>
          {tempBorrowedItemsDisplayList.length === 0 ? (
            <WarningAlert message="No temporally borrowed items available" />
          ) : (
            <Grid
              container
              spacing={3}
              justifyContent="space-around"
              alignItems="center"
              direction="row"
            >
              {tempBorrowedItemsDisplayList}
            </Grid>
          )}
        </>
      )}
    </div>
  );
}

export default TemporaryBorrowedItems;
