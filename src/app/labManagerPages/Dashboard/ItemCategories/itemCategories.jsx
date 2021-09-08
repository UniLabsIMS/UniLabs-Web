import { Grid, Typography } from '@material-ui/core';
import { Zoom } from 'react-awesome-reveal';
import ItemCategoryCard from './components/labitemCategoryCard';
import NewCategoryFrom from './components/newCategoryForm';

function ItemCategories() {
  const allItemCategories = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(number => (
    <Grid item key={number}>
      <ItemCategoryCard />
    </Grid>
  ));
  return (
    <div>
      <Zoom triggerOnce>
        <Typography component="h2" variant="h4" gutterBottom align="center">
          Item Categories
        </Typography>
      </Zoom>
      <Zoom triggerOnce>
        <NewCategoryFrom />
      </Zoom>
      <Grid
        container
        spacing={3}
        justifyContent="space-around"
        alignItems="center"
        direction="row"
      >
        {allItemCategories}
      </Grid>
    </div>
  );
}

export default ItemCategories;
