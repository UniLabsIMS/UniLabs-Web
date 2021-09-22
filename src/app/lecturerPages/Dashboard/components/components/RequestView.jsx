import {
  Grid,
  makeStyles,
  Typography,
  Button,
  Card,
  CardContent,
} from '@material-ui/core';
import { Zoom } from 'react-awesome-reveal';
import PropTypes from 'prop-types';
import PageWrapper from '../../../../commonComponents/PageWrapper';
import Navbar from '../../../../commonComponents/navBar';
import DisplayItemCard from './DisplayItemCard';

const useStyles = makeStyles(theme => ({
  expenseCard: {
    padding: theme.spacing(1),
    paddingTop: theme.spacing(1),
    margin: theme.spacing(0.5),
  },
  reasonBox: {
    display: 'flex',
    alignItems: 'left',
  },
  content: {
    margin: theme.spacing(0),
    padding: theme.spacing(0),
    marginLeft: theme.spacing(4),
  },
  btnContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'left',
  },
  buttons: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
  },
}));

function RequestView({ req, viewAllReqs }) {
  const classes = useStyles();

  const allRequestedItems = req.requestedItems;

  const reqItems = allRequestedItems.map(reqItem => (
    <Grid item key={reqItem.id}>
      <DisplayItemCard reqItem={reqItem} />
    </Grid>
  ));

  return (
    <PageWrapper navBar={<Navbar />}>
      <Zoom triggerOnce>
        <Card className={classes.expenseCard}>
          <CardContent className={classes.content}>
            <div className={classes.reasonBox}>
              <Typography
                gutterBottom
                variant="h4"
                component="h2"
                align="center"
              >
                Reason
              </Typography>
            </div>
          </CardContent>
          <CardContent className={classes.content}>
            <div className={classes.reasonBox}>
              <Typography
                gutterBottom
                variant="h6"
                component="h2"
                align="justify"
                className={classes.lines}
              >
                {` ${req.reason}`}
              </Typography>
            </div>
            <div className={classes.btnContainer}>
              <Button
                onClick={() => viewAllReqs()}
                variant="contained"
                color="secondary"
                className={classes.buttons}
              >
                Accept
              </Button>
              <Button
                onClick={() => viewAllReqs()}
                variant="contained"
                color="secondary"
                className={classes.buttons}
              >
                Decline
              </Button>
            </div>
          </CardContent>
        </Card>
      </Zoom>
      <Zoom triggerOnce>
        <Card className={classes.expenseCard}>
          <CardContent className={classes.content}>
            <div className={classes.reasonBox}>
              <Typography
                gutterBottom
                variant="h4"
                component="h2"
                align="center"
              >
                Requested Items
              </Typography>
            </div>
          </CardContent>

          <Grid
            container
            spacing={3}
            justifyContent="space-around"
            alignItems="stretch"
            direction="row"
          >
            {reqItems}
          </Grid>
        </Card>
      </Zoom>
    </PageWrapper>
  );
}

RequestView.propTypes = {
  req: PropTypes.objectOf(PropTypes.elements).isRequired,
  viewAllReqs: PropTypes.objectOf(PropTypes.elements).isRequired,
};

export default RequestView;
