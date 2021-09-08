import { Grid, Typography } from '@material-ui/core';
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
      <Typography component="h2" variant="h4" gutterBottom align="center">
        Item Categories
      </Typography>
      <NewCategoryFrom />
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
