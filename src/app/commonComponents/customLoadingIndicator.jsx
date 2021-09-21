import { makeStyles, Box, Container } from '@material-ui/core';

import { BeatLoader } from 'react-spinners';

const useStyles = makeStyles(theme => ({
  box: {
    minHeight: '95vh',
  },
}));
function CustomLoadingIndicator() {
  const classes = useStyles();
  return (
    <Container>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        className={classes.box}
      >
        <BeatLoader />
      </Box>
    </Container>
  );
}

export default CustomLoadingIndicator;
