import { Grid, Typography } from '@material-ui/core';
import { useEffect } from 'react';
import { Zoom } from 'react-awesome-reveal';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchLabAssistantCategories,
  resetLabAssistantCategoriesState,
} from '../../../../store/actions/labAssistant/labAssistantCategories';
import CustomLoadingIndicator from '../../../commonComponents/customLoadingIndicator';
import ErrorAlert from '../../../commonComponents/errorAlert';
import WarningAlert from '../../../commonComponents/warningAlert';
import ItemCategoryCard from './components/itemCategoryCard';

function ItemCategories() {
  const isCategoriesLoading = useSelector(
    state => state.labAssistantCategories.isCategoriesLoading,
  );
  const isCategoriesError = useSelector(
    state => state.labAssistantCategories.isCategoriesError,
  );
  const dispatch = useDispatch();
  const categoriesLst = useSelector(
    state => state.labAssistantCategories.categories,
  );
  const allItemCategories = categoriesLst.map(category => (
    <Grid item key={categoriesLst.indexOf(category)}>
      <ItemCategoryCard category={category} />
    </Grid>
  ));
  const reload = useSelector(
    state => state.labAssistantCategories.reloadCategories,
  );
  useEffect(() => {
    dispatch(fetchLabAssistantCategories());
  }, [dispatch, reload]);
  useEffect(
    () => () => {
      dispatch(resetLabAssistantCategoriesState());
    },
    [dispatch],
  );
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
      {isCategoriesLoading ? (
        <CustomLoadingIndicator minimumHeight="40vh" />
      ) : (
        <>
          {categoriesLst.length === 0 ? (
            <WarningAlert message="No categories available" />
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
        </>
      )}
    </div>
  );
}

export default ItemCategories;
