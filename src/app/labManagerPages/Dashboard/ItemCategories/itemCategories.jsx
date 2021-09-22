import { Grid, Typography } from '@material-ui/core';
import { useEffect } from 'react';
import { Zoom } from 'react-awesome-reveal';
import { useDispatch, useSelector } from 'react-redux';
import ItemCategoryCard from './components/labitemCategoryCard';
import NewCategoryFrom from './components/newCategoryForm';
import { fetchCategories } from '../../../../store/actions/labManager/labManagerDashboardActions';
import CustomLoadingIndicator from '../../../commonComponents/customLoadingIndicator';
import ErrorAlert from '../../../commonComponents/errorAlert';

function ItemCategories() {
  const isCategoriesLoading = useSelector(
    state => state.labManagerDashboard.isCategoriesLoading,
  );
  const isCategoriesError = useSelector(
    state => state.labManagerDashboard.isCategoriesError,
  );
  const dispatch = useDispatch();
  const categoriesLst = useSelector(
    state => state.labManagerDashboard.categories,
  );
  const allItemCategories = categoriesLst.map(category => (
    <Grid item key={categoriesLst.indexOf(category)}>
      <ItemCategoryCard category={category} />
    </Grid>
  ));

  const reload = useSelector(
    state => state.labManagerDashboard.reloadCategories,
  );
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch, reload]);
  if (isCategoriesError) {
    return <ErrorAlert message="Failed to load resources" />;
  }
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
      {isCategoriesLoading ? (
        <CustomLoadingIndicator minimumHeight="40vh" />
      ) : (
        <Grid
          container
          spacing={3}
          justifyContent="space-around"
          alignItems="center"
          direction="row"
        >
          {allItemCategories}
        </Grid>
      )}
    </div>
  );
}

export default ItemCategories;
