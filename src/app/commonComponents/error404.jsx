import { Box, Button, makeStyles, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  text: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  box: {
    marginTop: window.innerHeight / 2.5,
  },
  link: {
    textDecoration: 'none',
  },
}));
function Error404() {
  const classes = useStyles();
  return (
    <Box align="center" className={classes.box}>
      <Typography align="center" color="secondary" className={classes.text}>
        404 OOPS! Page Not Found.
      </Typography>
      <Box m={4} />
      <Link to="/" className={classes.link}>
        <Button variant="contained" color="primary">
          Go Back To Home Page
        </Button>
      </Link>
    </Box>
  );
}

export default Error404;
