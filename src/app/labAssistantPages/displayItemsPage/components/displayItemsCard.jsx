import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import Popover from '@material-ui/core/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import { Box } from '@material-ui/core';
import { Zoom } from 'react-awesome-reveal';
import PropTypes from 'prop-types';
import { LAB_ASSISTANT_ITEMS_URL } from '../../../constants';

const useStyles = makeStyles(theme => ({
  dspCard: {
    width: 345,
    paddingBottom: theme.spacing(1),
  },
  buttons: {
    margin: 'auto',
    display: 'flex',
  },
  content: {
    paddingBottom: theme.spacing(0),
  },
  cardActions: {
    display: 'block',
  },
}));

const DisplayItemsCard = ({ displayItem, categoryID }) => {
  const classes = useStyles();

  return (
    <Zoom triggerOnce>
      <Card className={classes.dspCard}>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="200"
          image={
            displayItem.image === null
              ? '/images/default-display-item-img.svg'
              : displayItem.image
          }
          title="Contemplative Reptile"
        />
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
                  {displayItem.name}
                  <InfoOutlinedIcon
                    color="secondary"
                    fontSize="small" // eslint-disable-next-line react/jsx-props-no-spreading
                    {...bindTrigger(popupState)}
                  />
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
                    <Typography variant="h6" component="h6">
                      Description
                    </Typography>
                    <Typography>{displayItem.description}</Typography>
                  </Box>
                </Popover>
              </div>
            )}
          </PopupState>
        </CardContent>
        <CardActions className={classes.cardActions}>
          <Link
            style={{ textDecoration: 'none' }}
            to={LAB_ASSISTANT_ITEMS_URL.concat(
              `/${displayItem.id}?categoryId=${categoryID}`,
            )}
          >
            <Button
              variant="outlined"
              color="secondary"
              className={classes.buttons}
            >
              Go to Items
            </Button>
          </Link>
        </CardActions>
      </Card>
    </Zoom>
  );
};
DisplayItemsCard.propTypes = {
  displayItem: PropTypes.objectOf(PropTypes.any).isRequired,
  categoryID: PropTypes.string.isRequired,
};

export default DisplayItemsCard;
