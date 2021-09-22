import { Box, Grid, makeStyles, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Zoom } from 'react-awesome-reveal';
import PageWrapper from '../../commonComponents/PageWrapper';
import Navbar from '../../commonComponents/navBar';
import DisplayItemsCard from './components/displayItemsCard';
import BreadcrumbsWrapper from '../../commonComponents/breadCrumbsWrapper';

const useStyles = makeStyles(theme => ({
  link: {
    textDecoration: 'none',
    color: theme.palette.secondary.main,
  },
}));

function LabAssistantDisplayItemsPage() {
  const classes = useStyles();
  const allDisplayItems = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(number => (
    <Grid item key={number}>
      <DisplayItemsCard />
    </Grid>
  ));
  return (
    <PageWrapper navBar={<Navbar />}>
      <BreadcrumbsWrapper>
        <Link to="/lab_assistant" className={classes.link}>
          Categories
        </Link>
        <Box fontSize="inherit">Display Items</Box>
      </BreadcrumbsWrapper>
      <Zoom triggerOnce>
        <Typography component="h2" variant="h4" gutterBottom align="center">
          Display Items
        </Typography>
      </Zoom>
      <Grid
        container
        spacing={3}
        justifyContent="space-around"
        alignItems="stretch"
        direction="row"
      >
        {allDisplayItems}
      </Grid>
    </PageWrapper>
  );
}

export default LabAssistantDisplayItemsPage;
