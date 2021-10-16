import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { Box, Grid } from '@material-ui/core';
import { Zoom } from 'react-awesome-reveal';
import PropTypes from 'prop-types';
import { LECTURER_REQUEST_URL } from '../../../../constants';

const useStyles = makeStyles(theme => ({
  reqCard: {
    padding: theme.spacing(1),
    margin: theme.spacing(1),
    borderRadius: '5',
    border: '1px solid',
    color: 'black',
  },
  reqMainText: {
    fontSize: 18,
    fontWeight: 500,
    letterSpacing: theme.spacing(0.2),
    textAlign: 'left',
    [theme.breakpoints.down('sm')]: {
      textAlign: 'justify',
    },
  },
  reqSubText: {
    textAlign: 'right',
    letterSpacing: theme.spacing(0.2),
    [theme.breakpoints.down('sm')]: {
      textAlign: 'justify',
    },
  },
  button: {
    width: '50%',
  },
  cardActions: {
    display: 'block',
  },
}));

const StudentRequestCard = ({ studentReq }) => {
  const classes = useStyles();

  return (
    <Zoom triggerOnce>
      <Card className={classes.reqCard}>
        <Box>
          <Box>
            <CardContent>
              <Box>
                <Grid container alignItems="flex-start">
                  <Grid item xs={12} sm={8}>
                    <Typography className={classes.reqMainText}>
                      Student Index : {studentReq.student.student_id}
                    </Typography>
                    <Typography className={classes.reqMainText}>
                      Email : {studentReq.student.email}
                    </Typography>

                    <Typography className={classes.reqMainText}>
                      Lab : {studentReq.lab.name}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Typography className={classes.reqSubText}>
                      {studentReq.createdAt.substring(0, 10)}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          </Box>
          <Box>
            <CardActions className={classes.cardActions}>
              <Box align="center">
                <Link
                  style={{ textDecoration: 'none' }}
                  to={LECTURER_REQUEST_URL.concat(studentReq.id)}
                >
                  <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                  >
                    View Request
                  </Button>
                </Link>
              </Box>
            </CardActions>
          </Box>
        </Box>
      </Card>
    </Zoom>
  );
};

StudentRequestCard.propTypes = {
  studentReq: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default StudentRequestCard;
