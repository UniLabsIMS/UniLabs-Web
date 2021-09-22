import { Box, Grid, makeStyles, Typography, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Zoom } from 'react-awesome-reveal';
import PageWrapper from '../../commonComponents/PageWrapper';
import Navbar from '../../commonComponents/navBar';
import BreadcrumbsWrapper from '../../commonComponents/breadCrumbsWrapper';
import CategoryCard from './components/CategoryCard';

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
}));

function StudentCategoriesPage() {
  const classes = useStyles();

  const allCategories = [
    {
      name: 'Category 1',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent lobortis.',
      image: '/images/default-item-category-img.svg',
      id: 1,
    },
    {
      name: 'Category 2',
      location:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent lobortis.',
      image: '/images/default-item-category-img.svg',
      id: 2,
    },
    {
      name: 'Category 3',
      location:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent lobortis.',
      image: '/images/default-item-category-img.svg',
      id: 3,
    },
    {
      name: 'Category 4',
      location:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent lobortis.',
      image: '/images/default-item-category-img.svg',
      id: 4,
    },
    {
      name: 'Category 5',
      location:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent lobortis.',
      image: '/images/default-item-category-img.svg',
      id: 5,
    },
    {
      name: 'Category 6',
      location:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent lobortis.',
      image: '/images/default-item-category-img.svg',
      id: 6,
    },
    {
      name: 'Category 7',
      location:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent lobortis.',
      image: '/images/default-item-category-img.svg',
      id: 7,
    },
  ];

  const categories = allCategories.map(category => (
    <Grid item key={category.id}>
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
      <Grid
        container
        spacing={3}
        justifyContent="space-around"
        alignItems="stretch"
        direction="row"
      >
        {categories}
      </Grid>
    </PageWrapper>
  );
}

export default StudentCategoriesPage;
