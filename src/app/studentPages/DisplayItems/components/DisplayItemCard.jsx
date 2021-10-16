import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Box, Grid } from '@material-ui/core';
import { Zoom } from 'react-awesome-reveal';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addDisplayItemToBucket,
  decreaseItemQunatityinBucket,
  increaseItemQunatityinBucket,
} from '../../../../store/actions/student/studentBucketActions';

const useStyles = makeStyles(theme => ({
  card: {
    marginTop: theme.spacing(2),
    border: '1px solid',
    borderColor: theme.palette.secondary.main,
  },
  cardContent: {
    paddingTop: theme.spacing(0),
  },
  nestedGrid: {
    marginTop: theme.spacing(2),
  },
  cardActions: {
    display: 'block',
  },
  incrementDecrementButtons: {
    fontSize: 48,
    padding: 0,
  },
  cardTextContent: {
    textAlign: 'left',
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center',
    },
  },
  cardDescriptionContent: {
    textAlign: 'justify',
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center',
    },
  },
}));

const DisplayItemCard = ({ displayItem }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const bucketItems = useSelector(state => state.studentLabBucket.bucketItems);
  const correspondingBucketItem = bucketItems.find(
    bucketItem => bucketItem.displayItemId === displayItem.id,
  );
  const [quantity, setQuantity] = useState(
    correspondingBucketItem ? correspondingBucketItem.quantity : 0,
  );

  const handleIntialItemAdditionToBucket = displayItemObj => {
    setQuantity(quantity + 1);
    dispatch(addDisplayItemToBucket(displayItemObj));
  };

  const handleIncreasingQunatityToBucket = displayItemObj => {
    setQuantity(quantity + 1);
    dispatch(increaseItemQunatityinBucket(displayItemObj));
  };

  const handleDecreasingQunatityToBucket = displayItemObj => {
    setQuantity(quantity - 1);
    dispatch(decreaseItemQunatityinBucket(displayItemObj));
  };

  return (
    <Zoom triggerOnce>
      <Card className={classes.card}>
        <Box>
          <Grid container alignItems="flex-start">
            <Grid item xs={12} sm={12} md={4}>
              <CardMedia
                className={classes.dspCardImage}
                component="img"
                alt="Display Item Photo"
                height="220"
                image={
                  displayItem.image === null
                    ? '/images/default-display-item-img.svg'
                    : displayItem.image
                }
                title="Display Item Photo"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <Grid
                container
                spacing={3}
                alignItems="flex-start"
                className={classes.nestedGrid}
              >
                <Grid item xs={12} sm={8}>
                  <Box>
                    <CardContent className={classes.cardContent}>
                      <Box>
                        <Typography
                          variant="h5"
                          component="h2"
                          className={classes.cardTextContent}
                        >
                          {displayItem.name}
                        </Typography>
                        <Box>
                          <Typography
                            variant="h6"
                            component="h6"
                            className={classes.cardTextContent}
                          >
                            Description
                          </Typography>
                          <Typography
                            className={classes.cardDescriptionContent}
                          >
                            {displayItem.description.length > 250
                              ? `${displayItem.description.substring(
                                  1,
                                  250,
                                )}...`
                              : displayItem.description}
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box align="center">
                    <CardActions className={classes.cardActions}>
                      <Box>
                        {quantity > 0 ? (
                          <Grid container alignItems="center">
                            <Grid item xs={4}>
                              <Button
                                onClick={() =>
                                  handleDecreasingQunatityToBucket(displayItem)
                                }
                                variant="outlined"
                                color="secondary"
                              >
                                <Typography
                                  align="center"
                                  className={classes.incrementDecrementButtons}
                                >
                                  -
                                </Typography>
                              </Button>
                            </Grid>
                            <Grid item xs={4}>
                              <Typography variant="h4">
                                {quantity < 10 ? `0${quantity}` : quantity}
                              </Typography>
                            </Grid>
                            <Grid item xs={4}>
                              <Button
                                onClick={() =>
                                  handleIncreasingQunatityToBucket(displayItem)
                                }
                                variant="outlined"
                                color="secondary"
                                disabled={quantity === displayItem.itemCount}
                              >
                                <Typography
                                  align="center"
                                  className={classes.incrementDecrementButtons}
                                >
                                  +
                                </Typography>
                              </Button>
                            </Grid>
                          </Grid>
                        ) : (
                          <Box />
                        )}
                      </Box>
                      <Box>
                        {quantity === 0 && (
                          <Button
                            onClick={() =>
                              handleIntialItemAdditionToBucket(displayItem)
                            }
                            variant="contained"
                            color="secondary"
                            disabled={quantity === displayItem.itemCount}
                          >
                            Add to Bucket
                          </Button>
                        )}
                      </Box>
                    </CardActions>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </Zoom>
  );
};

DisplayItemCard.propTypes = {
  displayItem: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default DisplayItemCard;
