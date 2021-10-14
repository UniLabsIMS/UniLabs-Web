import { Box, Grid, makeStyles, Typography } from '@material-ui/core';
import { Link, useParams } from 'react-router-dom';
import { Zoom } from 'react-awesome-reveal';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import PageWrapper from '../../commonComponents/PageWrapper';
import Navbar from '../../commonComponents/navBar';
import BreadcrumbsWrapper from '../../commonComponents/breadCrumbsWrapper';
import DisplayItemCard from './components/DisplayItemCard';
import CustomLoadingIndicator from '../../commonComponents/customLoadingIndicator';
import ErrorAlert from '../../commonComponents/errorAlert';
import { fetchDisplayItems } from '../../../store/actions/student/studentDisplayItemsActions';

const useStyles = makeStyles(theme => ({
  link: {
    textDecoration: 'none',
    color: theme.palette.secondary.main,
  },
  cards: {
    width: '100%',
    borderRadius: '5',
  },
}));

function StudentDisplayItemsPage() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { categoryId } = useParams();
  const isDisplayItemsLoading = useSelector(
    state => state.studentDisplayItems.isDisplayItemsLoading,
  );
  const isDisplayItemsError = useSelector(
    state => state.studentDisplayItems.isDisplayItemsError,
  );
  const displayItemsLst = useSelector(
    state => state.studentDisplayItems.displayItems,
  );
  const reload = useSelector(
    state => state.studentDisplayItems.reloadDisplayItems,
  );
  useEffect(() => {
    dispatch(fetchDisplayItems(categoryId));
  }, [dispatch, reload, categoryId]);

  // const labId = displayItemsLst[0].lab.id;

  const displayItems = displayItemsLst.map(displayItem => (
    <Grid item key={displayItem.id}>
      <DisplayItemCard displayItem={displayItem} />
    </Grid>
  ));

  return (
    <PageWrapper navBar={<Navbar />}>
      <BreadcrumbsWrapper>
        <Link to="/student" className={classes.link}>
          Labs
        </Link>
        {/* <Link to={`/student/lab/${}`} className={classes.link}>
          Categories
        </Link> */}
        <Box fontSize="inherit">Items</Box>
      </BreadcrumbsWrapper>
      <Zoom triggerOnce>
        <Typography component="h2" variant="h4" gutterBottom align="center">
          Items
        </Typography>
      </Zoom>
      {isDisplayItemsError ? (
        <ErrorAlert message="Failed to load display items" />
      ) : (
        <div>
          {isDisplayItemsLoading ? (
            <CustomLoadingIndicator minimumHeight="60vh" />
          ) : (
            <div className={classes.cards}>{displayItems}</div>
          )}
        </div>
      )}
    </PageWrapper>
  );
}

export default StudentDisplayItemsPage;
