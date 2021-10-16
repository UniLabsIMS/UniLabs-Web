import { Grid, Typography, makeStyles, Box } from '@material-ui/core';
import { Zoom } from 'react-awesome-reveal';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import PageWrapper from '../../commonComponents/PageWrapper';
import Navbar from '../../commonComponents/navBar';
import BreadcrumbsWrapper from '../../commonComponents/breadCrumbsWrapper';
import { STUDENT_BASE_URL, STUDENT_CATEGORIES_URL } from '../../constants';
import WarningAlert from '../../commonComponents/warningAlert';
import CustomLoadingIndicator from '../../commonComponents/customLoadingIndicator';
import ErrorAlert from '../../commonComponents/errorAlert';
import SuccessAlert from '../../commonComponents/successAlert';
import { fetchLabLecturers } from '../../../store/actions/student/studentBucketActions';
import BucketRequestForm from './components/BucketRequestForm';
import BucketItemCard from './components/BucketItemCard';

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

  const bucketItemsList = bucketItemsOfLab.map(bucketItem => (
    <Grid item key={bucketItem.displayItemId}>
      <BucketItemCard bucketItem={bucketItem} />
    </Grid>
  ));

  const isBucketLoading = useSelector(
    state => state.studentLabBucket.isBucketLoading,
  );
  const bucketError = useSelector(state => state.studentLabBucket.bucketError);
  const isNewRequestLaoding = useSelector(
    state => state.studentLabBucket.isNewRequestLaoding,
  );
  const newRequestSuccess = useSelector(
    state => state.studentLabBucket.newRequestSuccess,
  );
  const newRequestError = useSelector(
    state => state.studentLabBucket.newRequestError,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLabLecturers(labId));
  }, [dispatch, labId]);

  if (isBucketLoading || isNewRequestLaoding) {
    return <CustomLoadingIndicator />;
  }

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
      {newRequestSuccess ? (
        <>
          <SuccessAlert message="Successfully added new requests." />
          <Box m={2} />
        </>
      ) : (
        <div />
      )}
      {newRequestError ? (
        <>
          <ErrorAlert message="Failed to submit the request. Make sure you have no currenlty pending requests for this lab." />
          <Box m={2} />
        </>
      ) : (
        <div />
      )}
      {bucketError ? (
        <ErrorAlert message="Failed to laod the lab bucket" />
      ) : (
        <div>
          {bucketItemsOfLab.length === 0 ? (
            <WarningAlert message="No items in the bucket for this lab." />
          ) : (
            <div>
              <Zoom triggerOnce>
                <BucketRequestForm bucketItems={bucketItemsOfLab} />
              </Zoom>
              <div className={classes.cards}>{bucketItemsList}</div>
            </div>
          )}
        </div>
      )}
    </PageWrapper>
  );
}

export default BucketPage;
