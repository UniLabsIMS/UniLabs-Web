import { Grid, Typography, Box, makeStyles, Paper } from '@material-ui/core';
import { Zoom } from 'react-awesome-reveal';
import Chart from 'react-google-charts';
import PropTypes from 'prop-types';
import CountCard from './countCard';

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
  const itemStatCards = [];
  itemStatCards.push(
    <CountCard title="Total Items" key="Total Items" count={totalItems} />,
  );
  itemStatCards.push(
    <CountCard
      title="Available"
      key="Available"
      count={availableItems}
      total={totalItems}
      showPercentage
    />,
  );
  itemStatCards.push(
    <CountCard
      title="Damaged"
      key="Damaged"
      count={damagedItems}
      total={totalItems}
      showPercentage
    />,
  );
  itemStatCards.push(
    <CountCard
      title="Borrowed"
      key="Borrowed"
      count={borrowedItems}
      total={totalItems}
      showPercentage
    />,
  );
  itemStatCards.push(
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
        <Typography
          componenet="h2"
          variant="h4"
          align="center"
          color="textSecondary"
        >
          Item Summary
        </Typography>
      </Zoom>
      <Box m={3} />
      <Grid container spacing={3}>
        <Grid item md={12} lg={6}>
          <Zoom triggerOnce>
            <Paper align="center" m={2} className={classes.graphCard}>
              <Typography variant="h5" align="center">
                Item Summary Bar Chart
              </Typography>
              <Chart
                width="100%"
                height="395px"
                chartType="BarChart"
                loader={<div>Loading Chart</div>}
                data={[
                  [
                    'Item State',
                    'Count',
                    { role: 'style' },
                    {
                      sourceColumn: 0,
                      role: 'annotation',
                      type: 'string',
                      calc: 'stringify',
                    },
                  ],

                  ['Available Items', availableItems, '#119619', null],
                  ['Borrowed Items', borrowedItems, '#FF9901', null],
                  [
                    'Temporally Borrowed Items',
                    tempBorrowedItems,
                    '#3467CC',
                    null,
                  ],
                  ['Damaged Items', damagedItems, '#DC3A13', null],
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
            {itemStatCards}
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
