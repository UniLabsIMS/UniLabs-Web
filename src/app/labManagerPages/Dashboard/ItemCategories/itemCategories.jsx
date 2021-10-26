import { Grid, Typography } from '@material-ui/core';
import { useEffect } from 'react';
import { Zoom } from 'react-awesome-reveal';
import { useDispatch, useSelector } from 'react-redux';
import ItemCategoryCard from './components/labitemCategoryCard';
import NewCategoryFrom from './components/newCategoryForm';
import {
  fetchCategories,
  resetLabManagerCategoriesState,
} from '../../../../store/actions/labManager/labManagerCategoriesActions';
import CustomLoadingIndicator from '../../../commonComponents/customLoadingIndicator';
import ErrorAlert from '../../../commonComponents/errorAlert';
import DefaultPasswordWarining from '../../../commonComponents/defaultPasswordWarning';

function ItemCategories() {
  const labName = useSelector(state => state.auth.user.otherDetails.lab.name);
  const isDefaultPassword = useSelector(
    state => state.auth.user.isDefaultPassword,
  );
  const isCategoriesLoading = useSelector(
    state => state.labManagerCategories.isCategoriesLoading,
  );
  const isCategoriesError = useSelector(
    state => state.labManagerCategories.isCategoriesError,
  );
  const dispatch = useDispatch();
  const categoriesLst = useSelector(
    state => state.labManagerCategories.categories,
  );
  const allItemCategories = categoriesLst.map(category => (
    <Grid item key={categoriesLst.indexOf(category)}>
      <ItemCategoryCard category={category} />
    </Grid>
  ));

  const reload = useSelector(
    state => state.labManagerCategories.reloadCategories,
  );
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch, reload]);
  useEffect(
    () => () => {
      dispatch(resetLabManagerCategoriesState());
    },
    [dispatch],
  );
  if (isCategoriesError) {
    return <ErrorAlert message="Failed to load resources" />;
  }
  return (
    <div>
      <Zoom triggerOnce>
        <Typography component="h2" variant="h5" gutterBottom align="center">
          {labName.toUpperCase()}
        </Typography>
        <Typography component="h2" variant="h4" gutterBottom align="center">
          Item Categories
        </Typography>
      </Zoom>
      {isDefaultPassword ? <DefaultPasswordWarining /> : <div />}
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
