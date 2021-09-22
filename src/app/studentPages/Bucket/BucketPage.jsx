import { Grid, Typography, makeStyles, Box } from '@material-ui/core';
import { Zoom } from 'react-awesome-reveal';
import { Link, useParams } from 'react-router-dom';
import PageWrapper from '../../commonComponents/PageWrapper';
import Navbar from '../../commonComponents/navBar';
import BreadcrumbsWrapper from '../../commonComponents/breadCrumbsWrapper';
import DisplayBucketItemCard from './components/DisplayBucketItemCard';
import RequestBucket from './components/BucketRequestForm';

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

function BucketPage() {
  const classes = useStyles();
  const { labId } = useParams();

  const allDisplayItems = [
    {
      name: 'Item 1',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent lobortis.',
      image: '/images/default-display-item-img.svg',
      id: 1,
      quantity: 2,
    },
    {
      name: 'Item 2',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent lobortis.',
      image: '/images/default-display-item-img.svg',
      id: 2,
      quantity: 5,
    },
    {
      name: 'Item 4',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent lobortis.',
      image: '/images/default-display-item-img.svg',
      id: 4,
      quantity: 1,
    },
    {
      name: 'Item 7',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent lobortis.',
      image: '/images/default-display-item-img.svg',
      id: 7,
      quantity: 4,
    },
  ];

  const displayItems = allDisplayItems.map(displayItem => (
    <Grid item key={displayItem.id}>
      <DisplayBucketItemCard displayItem={displayItem} />
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
        <Box fontSize="inherit">My Bucket</Box>
      </BreadcrumbsWrapper>
      <Zoom triggerOnce>
        <Typography component="h2" variant="h4" gutterBottom align="center">
          My Bucket
        </Typography>
      </Zoom>
      <Zoom triggerOnce>
        <RequestBucket />
      </Zoom>
      <div className={classes.cards}>{displayItems}</div>
    </PageWrapper>
  );
}

export default BucketPage;
