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
import { Box, Grid, Modal } from '@material-ui/core';
import { useState } from 'react';
import EditDisplayItemForm from './editDisplayItemForm';

const useStyles = makeStyles(theme => ({
  expenseCard: {
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

const DisplayItemsCard = () => {
  const classes = useStyles();
  const [editModalState, setEditModalState] = useState(false);
  const handleEditModalOpen = () => setEditModalState(true);
  const handleEditModalClose = () => setEditModalState(false);

  return (
    <Card className={classes.expenseCard}>
      <CardMedia
        component="img"
        alt="Contemplative Reptile"
        height="200"
        image="/images/default-display-item-img.jpg"
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
                Display Item
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
                  <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum
                  </Typography>
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
              to="/lab_manager/display_item/456"
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
      <Modal
        open={editModalState}
        aria-labelledby="edit-category-modal-title"
        aria-describedby="edit-category-modal-description"
        align="center"
        className={classes.modal}
      >
        <div className={classes.modal_div}>
          <EditDisplayItemForm
            onSubmitSuccess={handleEditModalClose}
            onClose={handleEditModalClose}
          />
        </div>
      </Modal>
    </Card>
  );
};

export default DisplayItemsCard;
