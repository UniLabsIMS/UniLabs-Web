import { Box, Grid, makeStyles, Typography } from '@material-ui/core';
import { Link, useParams } from 'react-router-dom';
import { Zoom } from 'react-awesome-reveal';
import PageWrapper from '../../commonComponents/PageWrapper';
import Navbar from '../../commonComponents/navBar';
import BreadcrumbsWrapper from '../../commonComponents/breadCrumbsWrapper';
import DisplayItemCard from './components/DisplayItemCard1';

const useStyles = makeStyles(theme => ({
  link: {
    textDecoration: 'none',
    color: theme.palette.secondary.main,
  },
}));

function StudentDisplayItemsPage() {
  const classes = useStyles();
  const { labId } = useParams();

  const allDisplayItems = [
    {
      name: 'Item 1',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent lobortis.',
      image: '/images/default-display-item-img.jpg',
      id: 1,
    },
    {
      name: 'Item 2',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent lobortis.',
      image: '/images/default-display-item-img.jpg',
      id: 2,
    },
    {
      name: 'Item 3',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent lobortis.',
      image: '/images/default-display-item-img.jpg',
      id: 3,
    },
    {
      name: 'Item 4',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent lobortis.',
      image: '/images/default-display-item-img.jpg',
      id: 4,
    },
    {
      name: 'Item 5',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent lobortis.',
      image: '/images/default-display-item-img.jpg',
      id: 5,
    },
    {
      name: 'Item 6',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent lobortis.',
      image: '/images/default-display-item-img.jpg',
      id: 6,
    },
    {
      name: 'Item 7',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent lobortis.',
      image: '/images/default-display-item-img.jpg',
      id: 7,
    },
  ];

  const displayItems = allDisplayItems.map(displayItem => (
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
        <Link to={`/student/lab/${labId}`} className={classes.link}>
          Categories
        </Link>
        <Box fontSize="inherit">Items</Box>
      </BreadcrumbsWrapper>
      <Zoom triggerOnce>
        <Typography component="h2" variant="h4" gutterBottom align="center">
          Items
        </Typography>
      </Zoom>
      <Grid
        container
        spacing={3}
        justifyContent="space-around"
        alignItems="stretch"
        direction="column"
      >
        {displayItems}
      </Grid>
    </PageWrapper>
  );
}

export default StudentDisplayItemsPage;
