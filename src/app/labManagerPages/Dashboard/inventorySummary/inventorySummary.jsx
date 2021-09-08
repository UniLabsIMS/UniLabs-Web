import { Box, Divider, makeStyles, Typography } from '@material-ui/core';
import Chart from 'react-google-charts';

const useStyles = makeStyles(theme => ({
  chartContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

function InventorySummary() {
  const classes = useStyles();
  return (
    <div>
      <Typography component="h2" variant="h4" gutterBottom align="center">
        Lab Inventory Summary
      </Typography>
      <Divider />
      <Box m={3} />
      <Box className={classes.chartContainer}>
        <Typography component="h5" variant="h5" gutterBottom align="center">
          Lab Item Inventory Summary
        </Typography>
        <Chart
          width="90%"
          height="500px"
          chartType="PieChart"
          loader={<div>Loading Chart</div>}
          data={[
            ['Item State', 'Name'],
            ['Available', 11],
            ['Damaged', 2],
            ['Borrowed', 5],
            ['Temporally Borrowed', 8],
          ]}
          options={{
            colors: ['green', 'red', 'orange', 'blue'],
            legend: 'top',
            // title: 'Lab Item Inventory Summary',
            legendTextStyle: {
              fontSize: 18,
              bold: false,
            },
            is3D: true,
            backgroundColor: {
              fillOpacity: 0,
            },
          }}
          rootProps={{ 'data-testid': '2' }}
        />
      </Box>
    </div>
  );
}

export default InventorySummary;
