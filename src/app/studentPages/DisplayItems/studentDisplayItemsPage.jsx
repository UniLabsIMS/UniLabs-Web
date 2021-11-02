import { Box, Grid, makeStyles, Typography } from '@material-ui/core';
import { Link, useParams, useLocation } from 'react-router-dom';
import { Zoom } from 'react-awesome-reveal';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import PageWrapper from '../../commonComponents/PageWrapper';
import Navbar from '../../commonComponents/navBar';
import BreadcrumbsWrapper from '../../commonComponents/breadCrumbsWrapper';
import DisplayItemCard from './components/DisplayItemCard';
import CustomLoadingIndicator from '../../commonComponents/customLoadingIndicator';
import ErrorAlert from '../../commonComponents/errorAlert';
import WarningAlert from '../../commonComponents/warningAlert';
import { fetchDisplayItems } from '../../../store/actions/student/studentDisplayItemsActions';
import { STUDENT_BASE_URL, STUDENT_CATEGORIES_URL } from '../../constants';
import LabBucketEntranceCard from '../../commonComponents/labBucketEntranceCard';

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
  const labId = new URLSearchParams(useLocation().search).get('labId');
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

  const displayItems = displayItemsLst.map(displayItem => (
    <Grid item key={displayItem.id}>
      <DisplayItemCard displayItem={displayItem} />
    </Grid>
  ));

  return (
    <PageWrapper navBar={<Navbar />}>
      <BreadcrumbsWrapper>
        <Link to={STUDENT_BASE_URL} className={classes.link}>
          Labs
        </Link>
        <Link
          to={STUDENT_CATEGORIES_URL.concat(labId)}
          className={classes.link}
        >
          Categories
        </Link>
        <Box fontSize="inherit">Items</Box>
      </BreadcrumbsWrapper>
      <Zoom triggerOnce>
        <Typography component="h2" variant="h4" gutterBottom align="center">
          Items
        </Typography>
      </Zoom>
      <LabBucketEntranceCard labId={labId} />
      {isDisplayItemsError ? (
        <ErrorAlert message="Failed to load display items" />
      ) : (
        <Box m={2}>
          {isDisplayItemsLoading ? (
            <CustomLoadingIndicator minimumHeight="60vh" />
          ) : (
            <Box>
              {displayItemsLst.length === 0 ? (
                <Zoom triggerOnce>
                  <WarningAlert message="No Items Available" />
                </Zoom>
              ) : (
                <Box className={classes.cards}>{displayItems}</Box>
              )}
            </Box>
          )}
        </Box>
      )}
    </PageWrapper>
  );
}

export default StudentDisplayItemsPage;
