import { Box, Grid, makeStyles, Typography, Button } from '@material-ui/core';
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

const useStyles = makeStyles(theme => ({
  link: {
    textDecoration: 'none',
    color: theme.palette.secondary.main,
  },
  bucketButtonContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(5),
  },
  bucketButtonContainer1: {
    width: '30%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  bucketButton: {
    width: '100%',
    padding: theme.spacing(2),
    alignItems: 'center',
    fontSize: 'large',
  },
  gridItem: {
    width: '28%',
  },
}));

function StudentCategoriesPage() {
  const classes = useStyles();
  const dispatch = useDispatch();
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
  useEffect(() => {
    dispatch(fetchCategories(labId));
  }, [dispatch, reload, labId]);

  const categories = categoriesLst.map(category => (
    <Grid item key={category.id} className={classes.gridItem}>
      <CategoryCard category={category} />
    </Grid>
  ));

  return (
    <PageWrapper navBar={<Navbar />}>
      <BreadcrumbsWrapper>
        <Link to="/student" className={classes.link}>
          Labs
        </Link>
        <Box fontSize="inherit">Categories</Box>
      </BreadcrumbsWrapper>
      <Zoom triggerOnce>
        <Typography component="h2" variant="h4" gutterBottom align="center">
          Categories
        </Typography>
      </Zoom>

      <Zoom triggerOnce>
        <div className={classes.bucketButtonContainer}>
          <Link
            className={classes.bucketButtonContainer1}
            style={{ textDecoration: 'none' }}
            to="/student/lab-bucket/1"
          >
            <Button
              className={classes.bucketButton}
              color="secondary"
              variant="contained"
            >
              My Bucket
            </Button>
          </Link>
        </div>
      </Zoom>
      {isCategoriesError ? (
        <ErrorAlert message="Failed to load categories" />
      ) : (
        <div>
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
        </div>
      )}
    </PageWrapper>
  );
}

export default StudentCategoriesPage;
