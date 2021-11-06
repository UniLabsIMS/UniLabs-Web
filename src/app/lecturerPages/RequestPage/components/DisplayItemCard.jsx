import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import Popover from '@material-ui/core/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import { Box } from '@material-ui/core';
import { Zoom } from 'react-awesome-reveal';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  card: {
    alignItems: 'center',
    width: 330,
    paddingBottom: theme.spacing(1),
  },
  quantityText: {
    fontSize: 18,
    letterSpacing: theme.spacing(0.2),
  },
}));

const DisplayItemCard = ({ reqItem }) => {
  const classes = useStyles();
  return (
    <Zoom triggerOnce>
      <Card className={classes.card}>
        <CardMedia
          component="img"
          alt="Display Item Photo"
          height="200"
          image={
            reqItem.displayItem.image === null
              ? '/images/default-display-item-img.svg'
              : reqItem.displayItem.image
          }
          title="Display Item Photo"
        />
        <CardContent className={classes.content}>
          <PopupState variant="popover" popupId="demo-popup-popover">
            {popupState => (
              <div>
                <Typography gutterBottom variant="h5" align="center">
                  {reqItem.displayItem.name}
                  <InfoOutlinedIcon
                    color="secondary"
                    fontSize="small" // eslint-disable-next-line react/jsx-props-no-spreading
                    {...bindTrigger(popupState)}
                  />
                </Typography>
                <Typography align="center" className={classes.quantityText}>
                  Quantity Requested:{' '}
                  {reqItem.quantity < 10
                    ? `0${reqItem.quantity}`
                    : reqItem.quantity}
                </Typography>
                <Typography align="center" className={classes.quantityText}>
                  Total in Lab:{' '}
                  {reqItem.displayItem.itemCount < 10
                    ? `0${reqItem.displayItem.itemCount}`
                    : reqItem.displayItem.itemCount}
                </Typography>

                <Popover
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...bindPopover(popupState)}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                >
                  <Box p={2}>
                    <Typography variant="h6">Description</Typography>
                    <Typography>{reqItem.displayItem.description}</Typography>
                  </Box>
                </Popover>
              </div>
            )}
          </PopupState>
        </CardContent>
      </Card>
    </Zoom>
  );
};

DisplayItemCard.propTypes = {
  reqItem: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default DisplayItemCard;
