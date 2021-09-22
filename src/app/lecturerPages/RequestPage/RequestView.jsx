import {
  Grid,
  makeStyles,
  Typography,
  Button,
  Card,
  CardContent,
  Box,
} from '@material-ui/core';
import { Zoom } from 'react-awesome-reveal';
import { Link } from 'react-router-dom';
import PageWrapper from '../../commonComponents/PageWrapper';
import Navbar from '../../commonComponents/navBar';
import DisplayItemCard from './components/DisplayItemCard';
import BreadcrumbsWrapper from '../../commonComponents/breadCrumbsWrapper';

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
  link: {
    color: theme.palette.secondary.main,
  },
}));

function LecturerRequestViewPage() {
  const classes = useStyles();

  const allRequestedItems = [0, 1, 2, 3, 4, 5, 6];

  const reqItems = allRequestedItems.map(reqItem => (
    <Grid item key={allRequestedItems.indexOf(reqItem)}>
      <DisplayItemCard />
    </Grid>
  ));

  return (
    <PageWrapper navBar={<Navbar />}>
      <BreadcrumbsWrapper>
        <Link to="/lecturer" className={classes.link}>
          Home
        </Link>
        <Box fontSize="inherit">Request</Box>
      </BreadcrumbsWrapper>
      <div>
        <Zoom triggerOnce>
          <Typography component="h2" variant="h4" gutterBottom align="center">
            Student&apos;s Request
          </Typography>
        </Zoom>
        {/* <LecturerRequestViewPage req={req} viewAllReqs={viewAllReqs} /> */}
      </div>
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
                {` Dummy Request Reason`}
              </Typography>
            </div>
            <div className={classes.btnContainer}>
              <Button
                onClick={() => {}}
                variant="contained"
                color="secondary"
                className={classes.buttons}
              >
                Accept
              </Button>
              <Button
                onClick={() => {}}
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

export default LecturerRequestViewPage;
