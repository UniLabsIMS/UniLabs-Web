import { Box, Grid, makeStyles, Typography } from '@material-ui/core';
import { Link, useParams } from 'react-router-dom';
import { Zoom } from 'react-awesome-reveal';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import PageWrapper from '../../commonComponents/PageWrapper';
import Navbar from '../../commonComponents/navBar';
import BreadcrumbsWrapper from '../../commonComponents/breadCrumbsWrapper';
import CategoryCard from './components/CategoryCard';
import CustomLoadingIndicator from '../../commonComponents/customLoadingIndicator';
import ErrorAlert from '../../commonComponents/errorAlert';
import { fetchCategories } from '../../../store/actions/student/studentCategoriesActions';
import { STUDENT_BASE_URL } from '../../constants';
import LabBucketEntranceCard from '../../commonComponents/labBucketEntranceCard';

const useStyles = makeStyles(theme => ({
  link: {
    textDecoration: 'none',
    color: theme.palette.secondary.main,
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

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategories(labId));
  }, [dispatch, reload, labId]);

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
      <LabBucketEntranceCard labId={labId} />
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
