import { Box, Grid, Typography } from '@material-ui/core';
import { Zoom } from 'react-awesome-reveal';
import ItemSummary from './components/itemSummary';
import StrechedCountCard from './components/StrechedCountCard';

function LabSummary() {
  return (
    <div>
      <Zoom triggerOnce>
        <Typography component="h2" variant="h4" gutterBottom align="center">
          Lab Summary
        </Typography>
      </Zoom>
      <Box m={3} />
      <Grid
        container
        spacing={3}
        justifyContent="space-around"
        alignItems="center"
        direction="row"
      >
        <StrechedCountCard title="Lab Managers Assigned" count={4} />
        <StrechedCountCard title="Lab Assistants Assigned" count={12} />
        <StrechedCountCard title="Total Categories" count={4} />
        <StrechedCountCard title="Total Display Items" count={12} />
      </Grid>

      <Box m={7} />

      <ItemSummary
        totalItems={25}
        availableItems={8}
        damagedItems={7}
        borrowedItems={6}
        tempBorrowedItems={4}
      />
    </div>
  );
}

export default LabSummary;
