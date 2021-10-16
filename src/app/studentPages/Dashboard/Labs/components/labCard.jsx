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
import { STUDENT_CATEGORIES_URL } from '../../../../constants';

const useStyles = makeStyles(theme => ({
  labCard: {
    alignItems: 'center',
    width: 330,
    paddingBottom: theme.spacing(1),
  },
  buttons: {
    margin: theme.spacing(0, 0, 0),
    display: 'flex',
  },
  content: {
    paddingBottom: theme.spacing(0),
  },
  cardContents: {
    alignItems: 'center',
    flexDirection: 'column',
  },
}));

const LabCard = ({ lab }) => {
  const classes = useStyles();

  return (
    <Zoom triggerOnce>
      <Card className={classes.labCard}>
        <CardMedia
          component="img"
          alt="Lab Photo"
          height="200"
          image={lab.image === null ? '/images/default-lab-img.svg' : lab.image}
          title="Lab Photo"
        />
        <CardContent className={classes.content}>
          <PopupState variant="popover" popupId="demo-popup-popover">
            {popupState => (
              <div>
                <Typography variant="h6" component="h2" align="center">
                  {`${lab.department.code} ${lab.name}`}
                  <InfoOutlinedIcon
                    color="secondary"
                    fontSize="small" // eslint-disable-next-line react/jsx-props-no-spreading
                    {...bindTrigger(popupState)}
                  />
                </Typography>
                <Typography align="center">
                  Department: {lab.department.name}
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
                    <Typography color="primary">Location</Typography>
                    <Typography>{lab.location}</Typography>
                    <Typography color="primary">Contact Details</Typography>
                    <Typography>Email: {lab.contactEmail}</Typography>
                    <Typography>Contact Number: {lab.contactNo}</Typography>
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
            to={STUDENT_CATEGORIES_URL.concat(lab.id)}
          >
            <Button
              variant="outlined"
              color="secondary"
              className={classes.buttons}
            >
              View Categories
            </Button>
          </Link>
        </CardActions>
      </Card>
    </Zoom>
  );
};

LabCard.propTypes = {
  lab: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default LabCard;
