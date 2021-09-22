import { Box, Grid, makeStyles, Typography } from '@material-ui/core';
import { Link, useParams } from 'react-router-dom';
import { Zoom } from 'react-awesome-reveal';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import PageWrapper from '../../commonComponents/PageWrapper';
import Navbar from '../../commonComponents/navBar';
import DisplayItemsCard from './components/displayItemsCard';
import BreadcrumbsWrapper from '../../commonComponents/breadCrumbsWrapper';
import NewDisplayItemFrom from './components/newDisplayItemForm';
import {
  fetchDisplayItems,
  resetDisplayItemsPageState,
} from '../../../store/actions/labManager/labManagerDisplayItemsActions';
import { LAB_MANAGER_BASE_URL } from '../../constants';
import CustomLoadingIndicator from '../../commonComponents/customLoadingIndicator';
import ErrorAlert from '../../commonComponents/errorAlert';
import WarningAlert from '../../commonComponents/warningAlert';

const useStyles = makeStyles(theme => ({
  link: {
    textDecoration: 'none',
    color: theme.palette.secondary.main,
  },
}));

function LabManagerDisplayItemsPage() {
  const { categoryId } = useParams();
  const classes = useStyles();
  const dispatch = useDispatch();
  const isDisplayItemsLoading = useSelector(
    state => state.labManagerDisplayItems.isDisplayItemsLoading,
  );
  const isDisplayItemsError = useSelector(
    state => state.labManagerDisplayItems.isDisplayItemsError,
  );
  const displayItemsLst = useSelector(
    state => state.labManagerDisplayItems.displayItems,
  );
  const reload = useSelector(
    state => state.labManagerDisplayItems.reloadDisplayItems,
  );
  useEffect(() => {
    dispatch(fetchDisplayItems(categoryId));
  }, [dispatch, reload, categoryId]);

  useEffect(
    () => () => {
      dispatch(resetDisplayItemsPageState());
    },
    [dispatch],
  );

  const allDisplayItems = displayItemsLst.map(dspItem => (
    <Grid item key={displayItemsLst.indexOf(dspItem)}>
      <DisplayItemsCard displayItem={dspItem} />
    </Grid>
  ));
  return (
    <PageWrapper navBar={<Navbar />}>
      <BreadcrumbsWrapper>
        <Link to={LAB_MANAGER_BASE_URL} className={classes.link}>
          Categories
        </Link>
        <Box fontSize="inherit">Display Items</Box>
      </BreadcrumbsWrapper>
      <Zoom triggerOnce>
        <Typography component="h2" variant="h4" gutterBottom align="center">
          Display Items
        </Typography>
      </Zoom>
      {isDisplayItemsError ? (
        <ErrorAlert message="Failed to load resources" />
      ) : (
        <div>
          <Zoom triggerOnce>
            <NewDisplayItemFrom categoryID={categoryId} />
          </Zoom>
          {isDisplayItemsLoading ? (
            <CustomLoadingIndicator minimumHeight="40vh" />
          ) : (
            <>
              {allDisplayItems.length === 0 ? (
                <WarningAlert message="No display Items Added" />
              ) : (
                <Grid
                  container
                  spacing={3}
                  justifyContent="space-around"
                  alignItems="stretch"
                  direction="row"
                >
                  {allDisplayItems}
                </Grid>
              )}
            </>
          )}
        </div>
      )}
    </PageWrapper>
  );
}

export default LabManagerDisplayItemsPage;
