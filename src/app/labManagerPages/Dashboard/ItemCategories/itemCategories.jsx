import { Grid } from '@material-ui/core';
import ItemCategoryCard from './components/labitemCategoryCard';

function ItemCategories() {
  const allItemCategories = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(number => (
    <Grid item key={number}>
      <ItemCategoryCard />
    </Grid>
  ));
  return (
    <div>
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
