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
  expenseCard: {
    alignItems: 'center',
    maxWidth: 345,
    paddingBottom: theme.spacing(1),
  },
  buttons: {
    margin: theme.spacing(0, 0, 0),
    display: 'flex',
  },
  content: {
    paddingBottom: theme.spacing(0),
  },
  modal: {
    width: '85%',
    margin: 'auto',
    marginTop: theme.spacing(10),
  },
  cardContents: {
    alignItems: 'center',
    flexDirection: 'column',
  },
}));

const DisplayItemCard = ({ reqItem }) => {
  const classes = useStyles();

  return (
    <Zoom triggerOnce>
      <Card className={classes.expenseCard}>
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
                <Typography
                  gutterBottom
                  variant="h5"
                  component="h2"
                  align="center"
                >
                  {reqItem.displayItem.name}
                  <InfoOutlinedIcon
                    color="secondary"
                    fontSize="small" // eslint-disable-next-line react/jsx-props-no-spreading
                    {...bindTrigger(popupState)}
                  />
                </Typography>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="h2"
                  align="center"
                >
                  Quantity : {reqItem.quantity}
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
