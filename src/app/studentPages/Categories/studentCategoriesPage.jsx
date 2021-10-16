import { Box, Grid, makeStyles, Typography } from '@material-ui/core';
import { Link, useParams } from 'react-router-dom';
import { Zoom } from 'react-awesome-reveal';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import PageWrapper from '../../commonComponents/PageWrapper';
import Navbar from '../../commonComponents/navBar';
import BreadcrumbsWrapper from '../../commonComponents/breadCrumbsWrapper';
import CategoryCard from './components/CategoryCard';
import CustomLoadingIndicator from '../../commonComponents/customLoadingIndicator';
import ErrorAlert from '../../commonComponents/errorAlert';
import { fetchCategories } from '../../../store/actions/student/studentCategoriesActions';
import { STUDENT_BASE_URL, STUDENT_LAB_BUCKET_URL } from '../../constants';

const useStyles = makeStyles(theme => ({
  link: {
    textDecoration: 'none',
    color: theme.palette.secondary.main,
  },
  bucketCard: {
    maxWidth: 700,
    padding: theme.spacing(2),
    margin: 'auto',
    cursor: 'pointer',
  },
  bucketTitle: {
    textDecoration: 'none',
    color: theme.palette.secondary.main,
    fontSize: 26,
    fontWeight: 600,
  },
  bucketItemCount: {
    textDecoration: 'none',
    color: 'grey',
    fontWeight: 500,
    fontSize: 22,
  },
}));

const StudentCategoriesPage = () => {
  const classes = useStyles();
  const { labId } = useParams();

  const isCategoriesLoading = useSelector(
    state => state.studentCategories.isCategoriesLoading,
  );
  const isCategoriesError = useSelector(
    state => state.studentCategories.isCategoriesError,
  );
  const categoriesLst = useSelector(
    state => state.studentCategories.categories,
  );
  const reload = useSelector(state => state.studentCategories.reloadCategories);
  const bucketItems = useSelector(state => state.studentLabBucket.bucketItems);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategories(labId));
  }, [dispatch, reload, labId]);

  const bucketItemsOfLab = bucketItems.filter(
    bucketItem => bucketItem.labId === labId,
  );

  let count = 0;
  bucketItemsOfLab.forEach(bucketItem => {
    count += bucketItem.quantity;
  });
  const [itemsInBucketCount] = useState(count);

  const categories = categoriesLst.map(category => (
    <Grid item key={category.id}>
      <CategoryCard category={category} labId={labId} />
    </Grid>
  ));

  return (
    <PageWrapper navBar={<Navbar />}>
      <BreadcrumbsWrapper>
        <Link to={STUDENT_BASE_URL} className={classes.link}>
          All Labs
        </Link>
        <Box fontSize="inherit">Categories</Box>
      </BreadcrumbsWrapper>

      <Zoom triggerOnce>
        <Typography component="h2" variant="h4" gutterBottom align="center">
          Item Categories
        </Typography>
      </Zoom>
      <Box m={5} />
      <Zoom triggerOnce>
        <Link
          style={{ textDecoration: 'none' }}
          to={STUDENT_LAB_BUCKET_URL.concat(labId)}
        >
          <Box
            border={3}
            borderRadius={5}
            borderColor="primary.main"
            className={classes.bucketCard}
            fontSize="h5.fontSize"
            align="center"
          >
            <Box m={3} />
            <Typography className={classes.bucketTitle}>
              Go to Lab Bucket
            </Typography>
            <Typography className={classes.bucketItemCount}>
              {itemsInBucketCount < 10
                ? `0${itemsInBucketCount}`
                : itemsInBucketCount}{' '}
              Items in the Bucket.
            </Typography>
          </Box>
        </Link>
      </Zoom>
      <Box m={5} />

      {isCategoriesError ? (
        <ErrorAlert message="Failed to load categories" />
      ) : (
        <Box>
          {isCategoriesLoading ? (
            <CustomLoadingIndicator minimumHeight="60vh" />
          ) : (
            <Grid
              container
              spacing={3}
              justifyContent="space-around"
              alignItems="stretch"
              direction="row"
            >
              {categories}
            </Grid>
          )}
        </Box>
      )}
    </PageWrapper>
  );
};

export default StudentCategoriesPage;
