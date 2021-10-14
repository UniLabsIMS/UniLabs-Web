import { Grid, Typography, makeStyles, Box } from '@material-ui/core';
import { Zoom } from 'react-awesome-reveal';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PageWrapper from '../../commonComponents/PageWrapper';
import Navbar from '../../commonComponents/navBar';
import BreadcrumbsWrapper from '../../commonComponents/breadCrumbsWrapper';
import DisplayBucketItemCard from './components/DisplayBucketItemCard';
import RequestBucket from './components/BucketRequestForm';
import { STUDENT_BASE_URL, STUDENT_CATEGORIES_URL } from '../../constants';
import WarningAlert from '../../commonComponents/warningAlert';

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
  const bucketItems = useSelector(state => state.studentLabBucket.bucketItems);

  const bucketItemsOfLab = bucketItems.filter(
    bucketItem => bucketItem.labId === labId,
  );

  const displayItems = bucketItemsOfLab.map(bucketItem => (
    <Grid item key={bucketItem.displayItemId}>
      <DisplayBucketItemCard bucketItem={bucketItem} />
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
      {bucketItemsOfLab.length === 0 ? (
        <WarningAlert message="No items in the bucket for this lab." />
      ) : (
        <div className={classes.cards}>{displayItems}</div>
      )}
    </PageWrapper>
  );
}

export default BucketPage;
