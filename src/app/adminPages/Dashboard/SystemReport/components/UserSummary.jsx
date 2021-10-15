import { Grid, Typography, Box, makeStyles, Paper } from '@material-ui/core';
import { Zoom } from 'react-awesome-reveal';
import Chart from 'react-google-charts';
import PropTypes from 'prop-types';
import CountCard from './CountCard';

const useStyles = makeStyles(theme => ({
  graphCard: {
    border: '0.5px solid',
    borderColor: theme.palette.primary.main,
    paddingTop: theme.spacing(1),
    marginTop: theme.spacing(2),
  },
}));
const UserSummary = ({
  totalUsers,
  admins,
  students,
  lecturers,
  labMangers,
  labAssistants,
}) => {
  const classes = useStyles();
  const userStatCards = [];
  userStatCards.push(
    <CountCard title="Total Users" count={totalUsers} key="All" />,
  );
  userStatCards.push(
    <CountCard
      title="Admins"
      key="Admins"
      count={admins}
      total={totalUsers}
      showPercentage
    />,
  );
  userStatCards.push(
    <CountCard
      title="Students"
      key="Students"
      count={students}
      total={totalUsers}
      showPercentage
    />,
  );
  userStatCards.push(
    <CountCard
      title="Lecturers"
      key="Lecturers"
      count={lecturers}
      total={totalUsers}
      showPercentage
    />,
  );
  userStatCards.push(
    <CountCard
      title="Lab Managers"
      key="Lab Managers"
      count={labMangers}
      total={totalUsers}
      showPercentage
    />,
  );
  userStatCards.push(
    <CountCard
      title="Lab Assistants"
      key="Lab Assistants"
      count={labAssistants}
      total={totalUsers}
      showPercentage
    />,
  );
  return (
    <Box>
      <Zoom triggerOnce>
        <Typography variant="h4" gutterBottom align="center">
          User Summary
        </Typography>
      </Zoom>

      <Grid container spacing={3}>
        <Grid item md={12} lg={6}>
          <Grid
            container
            spacing={3}
            justifyContent="space-around"
            alignItems="center"
            direction="row"
          >
            {userStatCards}
          </Grid>
        </Grid>
        <Grid item md={12} lg={6}>
          <Zoom triggerOnce>
            <Paper align="center" m={2} className={classes.graphCard}>
              <Typography variant="h5" align="center">
                User Summary
              </Typography>
              <Chart
                width="100%"
                height="395px"
                chartType="BarChart"
                loader={<div>Loading Chart</div>}
                data={[
                  [
                    'Element',
                    'Density',
                    { role: 'style' },
                    {
                      sourceColumn: 0,
                      role: 'annotation',
                      type: 'string',
                      calc: 'stringify',
                    },
                  ],
                  ['Admins', admins, '#3467CC', null],
                  ['Students', students, '#DC3A13', null],
                  ['Lecturers', lecturers, '#FF9901', null],
                  ['Lab Mangers', labMangers, 'grey', null],
                  ['Lab Assistants', labAssistants, '#119619', null],
                ]}
                options={{
                  bar: { groupWidth: '95%' },
                  legend: { position: 'none' },
                  animation: {
                    startup: true,
                    easing: 'linear',
                    duration: 1500,
                  },
                  titleTextStyle: {
                    fontSize: 24,
                  },
                }}
              />
            </Paper>
          </Zoom>
        </Grid>
      </Grid>
    </Box>
  );
};
UserSummary.propTypes = {
  totalUsers: PropTypes.number.isRequired,
  admins: PropTypes.number.isRequired,
  students: PropTypes.number.isRequired,
  lecturers: PropTypes.number.isRequired,
  labMangers: PropTypes.number.isRequired,
  labAssistants: PropTypes.number.isRequired,
};
export default UserSummary;
