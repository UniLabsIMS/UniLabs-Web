import { Box, Container } from '@material-ui/core';

import { BeatLoader } from 'react-spinners';
import PropTypes from 'prop-types';

function CustomLoadingIndicator({ minimumHeight }) {
  return (
    <Container>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: minimumHeight }}
      >
        <BeatLoader color="pink" />
      </Box>
    </Container>
  );
}
CustomLoadingIndicator.defaultProps = {
  minimumHeight: '95vh',
};
CustomLoadingIndicator.propTypes = {
  minimumHeight: PropTypes.string,
};
export default CustomLoadingIndicator;
