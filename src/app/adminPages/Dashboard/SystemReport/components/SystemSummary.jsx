import { Grid, Typography, Box } from '@material-ui/core';
import { Zoom } from 'react-awesome-reveal';
import PropTypes from 'prop-types';
import CountCard from './CountCard';

const SystemSummary = ({
  totalDepartments,
  totalLabs,
  totalCategories,
  totalDisplayItems,
  totalItems,
}) => {
  const userStatCards = [];
  userStatCards.push(
    <CountCard
      title="Total Departments"
      key="Total Departments"
      count={totalDepartments}
    />,
  );
  userStatCards.push(
    <CountCard title="Total Labs" key="Total Labs" count={totalLabs} />,
  );
  userStatCards.push(
    <CountCard
      title="Total Categories"
      key="Total Categories"
      count={totalCategories}
    />,
  );
  userStatCards.push(
    <CountCard
      title="Total Display Items"
      key="Total Display Items"
      count={totalDisplayItems}
    />,
  );
  userStatCards.push(
    <CountCard title="Total Items" key="Total Items" count={totalItems} />,
  );
  return (
    <Box>
      <Zoom triggerOnce>
        <Typography variant="h4" gutterBottom align="center">
          User Summary
        </Typography>
      </Zoom>

      <Grid
        container
        spacing={3}
        justifyContent="space-around"
        alignItems="center"
        direction="row"
      >
        {userStatCards}
      </Grid>
    </Box>
  );
};
SystemSummary.propTypes = {
  totalDepartments: PropTypes.number.isRequired,
  totalLabs: PropTypes.number.isRequired,
  totalCategories: PropTypes.number.isRequired,
  totalDisplayItems: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
};
export default SystemSummary;
