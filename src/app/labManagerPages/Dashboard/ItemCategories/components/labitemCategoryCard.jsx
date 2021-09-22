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
import { Box, Modal } from '@material-ui/core';
import { useState } from 'react';
import { Zoom } from 'react-awesome-reveal';
import PropTypes from 'prop-types';
import EditCategoryForm from './editCategoryForm';
import { LAB_MANAGER_DISPLAY_ITEMS_URL } from '../../../../constants';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345,
    paddingBottom: theme.spacing(1),
  },
  buttons: {
    margin: 'auto',
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
}));

const ItemCategoryCard = ({ category }) => {
  const classes = useStyles();
  const [editModalState, setEditModalState] = useState(false);
  const handleEditModalOpen = () => setEditModalState(true);
  const handleEditModalClose = () => setEditModalState(false);

  return (
    <Zoom triggerOnce>
      <Card className={classes.card}>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="200"
          image="/images/default-item-category-img.svg"
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
                  {category.name}
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
                    <Typography>{category.description}</Typography>
                  </Box>
                </Popover>
              </div>
            )}
          </PopupState>
        </CardContent>
        <CardActions>
          <Link
            style={{ textDecoration: 'none' }}
            to={LAB_MANAGER_DISPLAY_ITEMS_URL.concat(`/${category.id}`)}
          >
            <Button
              variant="outlined"
              color="secondary"
              className={classes.buttons}
            >
              Go to Display Items
            </Button>
          </Link>
          <Button
            variant="outlined"
            color="primary"
            className={classes.buttons}
            onClick={handleEditModalOpen}
          >
            Edit Category
          </Button>
        </CardActions>

        <Modal
          open={editModalState}
          aria-labelledby="edit-category-modal-title"
          aria-describedby="edit-category-modal-description"
          align="center"
          className={classes.modal}
        >
          <div className={classes.modal_div}>
            <EditCategoryForm
              onSubmitSuccess={handleEditModalClose}
              onClose={handleEditModalClose}
            />
          </div>
        </Modal>
      </Card>
    </Zoom>
  );
};
ItemCategoryCard.propTypes = {
  category: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ItemCategoryCard;
