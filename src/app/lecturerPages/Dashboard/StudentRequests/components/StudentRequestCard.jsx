import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import PopupState from 'material-ui-popup-state';
import { Box } from '@material-ui/core';
import { Zoom } from 'react-awesome-reveal';
import PropTypes from 'prop-types';
import { LECTURER_REQUEST_URL } from '../../../../constants';

const useStyles = makeStyles(theme => ({
  reqCard: {
    padding: theme.spacing(1),
    margin: theme.spacing(1),
  },
  buttons: {
    margin: theme.spacing(1),
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
    height: '100%',
  },
  fullCard: {
    display: 'flex',
    flexDirection: 'row',
  },
  cardRest: {
    width: '70%',
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
  cardDetial: {
    padding: theme.spacing(0.5),
    margin: theme.spacing(1),
  },
}));

const StudentRequestCard = ({ studentReq }) => {
  const classes = useStyles();
  //   const { labId, categoryID } = useParams();

  return (
    <Zoom triggerOnce>
      <Card className={classes.reqCard}>
        <div className={classes.fullCard}>
          <div className={classes.cardRest}>
            <CardContent className={classes.content}>
              <PopupState variant="popover" popupId="demo-popup-popover">
                {popupState => (
                  <div>
                    <Box p={2} className={classes.cardDetial}>
                      <Typography variant="h6" component="h6">
                        Student ID : {studentReq.student.student_id}
                      </Typography>
                    </Box>
                    {/* <Box p={2} className={classes.cardDetial}>
                      <Typography variant="h6" component="h6">
                        Student Email : {studentReq.student.email}
                      </Typography>
                    </Box> */}
                    <Box p={2} className={classes.cardDetial}>
                      <Typography variant="h6" component="h6">
                        Laboratory : {studentReq.lab.name}
                      </Typography>
                    </Box>
                    <Box p={2} className={classes.cardDetial}>
                      <Typography variant="h6" component="h6">
                        Created at : {studentReq.createdAt.substring(0, 10)}
                      </Typography>
                    </Box>
                  </div>
                )}
              </PopupState>
            </CardContent>
          </div>
          <div className={classes.cardActionBox}>
            <CardActions className={classes.cardContents}>
              <div className={classes.quantityBox} />
              <div className={classes.btnBox}>
                <Link
                  className={classes.cardContents}
                  style={{ textDecoration: 'none' }}
                  to={LECTURER_REQUEST_URL.concat(studentReq.id)}
                >
                  <Button
                    variant="contained"
                    color="secondary"
                    className={classes.buttons}
                  >
                    View Request
                  </Button>
                </Link>
              </div>
            </CardActions>
          </div>
        </div>
      </Card>
    </Zoom>
  );
};

StudentRequestCard.propTypes = {
  studentReq: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default StudentRequestCard;
