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
import { Box, Grid } from '@material-ui/core';
import { useState } from 'react';
import { Zoom } from 'react-awesome-reveal';
import PropTypes from 'prop-types';
import EditDisplayItemForm from './editDisplayItemForm';
import { LAB_MANAGER_ITEMS_URL } from '../../../constants';

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
}));

const DisplayItemsCard = ({ displayItem, categoryID }) => {
  const classes = useStyles();
  const [editModalState, setEditModalState] = useState(false);
  const handleEditModalOpen = () => setEditModalState(true);
  const handleEditModalClose = () => setEditModalState(false);

  return (
    <Zoom triggerOnce>
      <Card className={classes.dspCard}>
        <CardMedia
          component="img"
          alt="Display Item Image"
          height="200"
          image={
            displayItem.image === null
              ? '/images/default-display-item-img.svg'
              : displayItem.image
          }
          title="Display Item Image"
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
        <CardActions>
          <Grid container direction="row" justifyContent="space-between">
            <Grid item xs={12} sm={5}>
              <Link
                style={{ textDecoration: 'none' }}
                to={LAB_MANAGER_ITEMS_URL.concat(
                  `/${displayItem.id}?categoryId=${categoryID}`,
                )}
              >
                <Button
                  variant="outlined"
                  color="secondary"
                  className={classes.buttons}
                >
                  View Items
                </Button>
              </Link>
            </Grid>
            <Grid item xs={12} sm={7}>
              <Button
                variant="outlined"
                color="primary"
                className={classes.buttons}
                onClick={handleEditModalOpen}
              >
                Edit Display Item
              </Button>
            </Grid>
          </Grid>
        </CardActions>

        <EditDisplayItemForm
          open={editModalState}
          displayItem={displayItem}
          onSubmitSuccess={handleEditModalClose}
          onClose={handleEditModalClose}
        />
      </Card>
    </Zoom>
  );
};
DisplayItemsCard.propTypes = {
  displayItem: PropTypes.objectOf(PropTypes.any).isRequired,
  categoryID: PropTypes.string.isRequired,
};

export default DisplayItemsCard;
