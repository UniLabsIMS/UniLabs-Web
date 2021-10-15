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
const ItemSummary = ({
  totalItems,
  availableItems,
  damagedItems,
  borrowedItems,
  tempBorrowedItems,
}) => {
  const classes = useStyles();
  const userStatCards = [];
  userStatCards.push(
    <CountCard title="Total Items" key="Total Items" count={totalItems} />,
  );
  userStatCards.push(
    <CountCard
      title="Available"
      key="Available"
      count={availableItems}
      total={totalItems}
      showPercentage
    />,
  );
  userStatCards.push(
    <CountCard
      title="Damaged"
      key="Damaged"
      count={damagedItems}
      total={totalItems}
      showPercentage
    />,
  );
  userStatCards.push(
    <CountCard
      title="Borrowed"
      key="Borrowed"
      count={borrowedItems}
      total={totalItems}
      showPercentage
    />,
  );
  userStatCards.push(
    <CountCard
      title="Temporarily Borrowed"
      key="Temporarily Borrowed"
      count={tempBorrowedItems}
      total={totalItems}
      showPercentage
    />,
  );
  return (
    <Box>
      <Zoom triggerOnce>
        <Typography variant="h4" gutterBottom align="center">
          Item Summary
        </Typography>
      </Zoom>

      <Grid container spacing={3}>
        <Grid item md={12} lg={6}>
          <Zoom triggerOnce>
            <Paper align="center" m={2} className={classes.graphCard}>
              <Typography variant="h5" align="center">
                Item Summary
              </Typography>
              <Chart
                width="100%"
                height="395px"
                chartType="PieChart"
                loader={<div>Loading Chart</div>}
                data={[
                  ['Item State', 'Count'],
                  ['Temporally Borrowed Items', tempBorrowedItems],
                  ['Damaged Items', damagedItems],
                  ['Borrowed Items', borrowedItems],
                  ['Available Items', availableItems],
                ]}
                options={{
                  legend: { position: 'none' },
                  animation: {
                    startup: true,
                    easing: 'linear',
                    duration: 1500,
                  },
                  titleTextStyle: {
                    fontSize: 24,
                  },
                  pieHole: 0.4,
                }}
              />
            </Paper>
          </Zoom>
        </Grid>
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
      </Grid>
    </Box>
  );
};
ItemSummary.propTypes = {
  totalItems: PropTypes.number.isRequired,
  availableItems: PropTypes.number.isRequired,
  damagedItems: PropTypes.number.isRequired,
  borrowedItems: PropTypes.number.isRequired,
  tempBorrowedItems: PropTypes.number.isRequired,
};
export default ItemSummary;
