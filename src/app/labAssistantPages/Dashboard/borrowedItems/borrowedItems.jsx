import { Box, Grid, Typography } from '@material-ui/core';
import { Zoom } from 'react-awesome-reveal';
import LabAssistantBorrowedItemsCard from './components/borrowedItemsCard';
import BorrowedItemSearchBar from './components/borrowedItemSearchBar';

function BorrowedItems() {
  const borrowedItems = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map(
    number => (
      <Grid item key={number}>
        <LabAssistantBorrowedItemsCard />
      </Grid>
    ),
  );
  return (
    <div>
      <Zoom triggerOnce>
        <Typography component="h2" variant="h4" gutterBottom align="center">
          Borrowed Items
        </Typography>
      </Zoom>
      <Box m={2} />
      <Zoom triggerOnce>
        <BorrowedItemSearchBar />
      </Zoom>
      <Box m={2} />
      <Grid
        container
        spacing={3}
        justifyContent="space-around"
        alignItems="center"
        direction="row"
      >
        {borrowedItems}
      </Grid>
    </div>
  );
}

export default BorrowedItems;
