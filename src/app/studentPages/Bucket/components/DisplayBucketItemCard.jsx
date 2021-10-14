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

const useStyles = makeStyles(theme => ({
  itemCard: {
    marginTop: theme.spacing(1),
  },
  itemCardImage: {
    height: 200,
  },
  buttons: {
    margin: theme.spacing(1),
    display: 'flex',
  },
  content: {
    paddingBottom: theme.spacing(0),
  },
  cardContents: {
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
}));

const DisplayBucketItemCard = ({ bucketItem }) => {
  const classes = useStyles();

  return (
    <Zoom triggerOnce>
      <Card className={classes.itemCard}>
        <div className={classes.fullCard}>
          <div className={classes.cardImg}>
            <CardMedia
              className={classes.itemCardImage}
              component="img"
              alt="Display Item Photo"
              width="200"
              image={
                bucketItem.image === null
                  ? '/images/default-display-item-img.svg'
                  : bucketItem.image
              }
              title="Display Item Photo"
            />
          </div>
          <div className={classes.cardRest}>
            <CardContent className={classes.content}>
              <PopupState variant="popover" popupId="demo-popup-popover">
                {popupState => (
                  <div>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                      align="center"
                    >
                      {bucketItem.name}
                    </Typography>
                    <Box p={2}>
                      <Typography variant="h6" component="h6">
                        Description
                      </Typography>
                      <Typography>{bucketItem.description}</Typography>
                    </Box>
                  </div>
                )}
              </PopupState>
            </CardContent>
          </div>
          <div className={classes.cardActionBox}>
            <CardActions className={classes.cardContents}>
              <div className={classes.quantityBox}>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="h2"
                  align="center"
                >
                  Quantity : {bucketItem.quantity}
                </Typography>
              </div>
              <div className={classes.btnBox}>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.buttons}
                >
                  Remove from Bucket
                </Button>
              </div>
            </CardActions>
          </div>
        </div>
      </Card>
    </Zoom>
  );
};

DisplayBucketItemCard.propTypes = {
  bucketItem: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default DisplayBucketItemCard;
