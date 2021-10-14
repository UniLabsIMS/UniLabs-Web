import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PopupState from 'material-ui-popup-state';
import { Box } from '@material-ui/core';
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
  dspCard: {
    marginTop: theme.spacing(1.5),
  },
  dspCardImage: {
    height: 200,
  },
  buttons: {
    display: 'flex',
  },
  content: {
    paddingBottom: theme.spacing(0),
  },
  cardContents: {
    paddingTop: theme.spacing(2),
    alignItems: 'center',
    flexDirection: 'column',
    height: '100%',
  },
  fullCard: {
    display: 'flex',
    flexDirection: 'row',
  },
  cardImg: {
    width: '25%',
  },
  cardRest: {
    width: '45%',
  },
  cardActionBox: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '30%',
  },
  quantityBox: {
    alignItems: 'center',
    height: '50%',
  },
  btnBox: {
    flexDirection: 'row',
    height: '50%',
  },
  incDecBtns: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    fontSize: 'large',
  },
  descriptionBox: {
    paddingTop: theme.spacing(2),
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
      <Card className={classes.dspCard}>
        <div className={classes.fullCard}>
          <div className={classes.cardImg}>
            <CardMedia
              className={classes.dspCardImage}
              component="img"
              alt="Display Item Photo"
              width="200"
              image={
                displayItem.image === null
                  ? '/images/default-display-item-img.svg'
                  : displayItem.image
              }
              title="Display Item Photo"
            />
          </div>
          <div className={classes.cardRest}>
            <CardContent className={classes.content}>
              <PopupState variant="popover" popupId="demo-popup-popover">
                {popupState => (
                  <div>
                    <Typography variant="h5" component="h2" align="left">
                      {displayItem.name}
                    </Typography>
                    <Box className={classes.descriptionBox}>
                      <Typography variant="h6" component="h6" align="left">
                        Description
                      </Typography>
                      <Typography align="justify">
                        {displayItem.description}
                      </Typography>
                    </Box>
                  </div>
                )}
              </PopupState>
            </CardContent>
          </div>
          <div className={classes.cardActionBox}>
            <CardActions className={classes.cardContents}>
              <div className={classes.quantityBox}>
                {quantity > 0 ? (
                  <Typography variant="h6" align="right">
                    Quantity - {quantity}
                  </Typography>
                ) : (
                  <div />
                )}
              </div>
              <div className={classes.btnBox}>
                {quantity === 0 && (
                  <Button
                    onClick={() =>
                      handleIntialItemAdditionToBucket(displayItem)
                    }
                    variant="contained"
                    color="secondary"
                    className={classes.buttons}
                    disabled={quantity === displayItem.itemCount}
                  >
                    Add to Bucket
                  </Button>
                )}
                {quantity > 0 && (
                  <div className={classes.incDecBtns}>
                    <Button
                      onClick={() =>
                        handleDecreasingQunatityToBucket(displayItem)
                      }
                      variant="outlined"
                      color="secondary"
                      className={classes.buttons}
                    >
                      <Typography
                        align="center"
                        style={{ fontSize: 48, padding: 0 }}
                      >
                        -
                      </Typography>
                    </Button>
                    <Button
                      onClick={() =>
                        handleIncreasingQunatityToBucket(displayItem)
                      }
                      variant="outlined"
                      color="secondary"
                      className={classes.buttons}
                      disabled={quantity === displayItem.itemCount}
                    >
                      <Typography align="center" style={{ fontSize: 48 }}>
                        +
                      </Typography>
                    </Button>
                  </div>
                )}
              </div>
            </CardActions>
          </div>
        </div>
      </Card>
    </Zoom>
  );
};

DisplayItemCard.propTypes = {
  displayItem: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default DisplayItemCard;
