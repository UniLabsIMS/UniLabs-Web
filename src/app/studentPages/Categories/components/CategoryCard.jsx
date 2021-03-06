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
import { STUDENT_DISPLAY_ITEMS_URL } from '../../../constants';

const useStyles = makeStyles(theme => ({
  categoryCard: {
    alignItems: 'center',
    width: 335,
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

const CategoryCard = ({ category, labId }) => {
  const classes = useStyles();

  return (
    <Zoom triggerOnce>
      <Card className={classes.categoryCard}>
        <CardMedia
          component="img"
          alt="Category Photo"
          height="200"
          image={
            category.image === null
              ? '/images/default-item-category-img.svg'
              : category.image
          }
          title="Category Photo"
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
        <CardActions className={classes.cardContents}>
          <Link
            className={classes.cardContents}
            style={{ textDecoration: 'none' }}
            to={STUDENT_DISPLAY_ITEMS_URL.concat(category.id).concat(
              `?labId=${labId}`,
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
        </CardActions>
      </Card>
    </Zoom>
  );
};

CategoryCard.propTypes = {
  category: PropTypes.objectOf(PropTypes.any).isRequired,
  labId: PropTypes.string.isRequired,
};

export default CategoryCard;
