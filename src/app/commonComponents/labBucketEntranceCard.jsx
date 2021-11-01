import { Box, makeStyles, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Zoom } from 'react-awesome-reveal';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { STUDENT_LAB_BUCKET_URL } from '../constants';

const useStyles = makeStyles(theme => ({
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
const LabBucketEntranceCard = ({ labId }) => {
  const classes = useStyles();
  const bucketItems = useSelector(state => state.studentLabBucket.bucketItems);
  const [itemsInBucketCount, setItemsInBucketCount] = useState(0);

  useEffect(() => {
    const itemsOfLab = bucketItems.filter(
      bucketItem => bucketItem.labId === labId,
    );
    let count = 0;
    itemsOfLab.forEach(item => {
      count += item.quantity;
    });
    setItemsInBucketCount(count);
  }, [bucketItems, labId]);

  return (
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
  );
};
LabBucketEntranceCard.propTypes = {
  labId: PropTypes.string.isRequired,
};
export default LabBucketEntranceCard;
