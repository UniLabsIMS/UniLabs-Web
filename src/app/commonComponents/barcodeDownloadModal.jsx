import {
  Box,
  Button,
  makeStyles,
  Modal,
  Paper,
  Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { useRef } from 'react';
import Barcode from 'react-barcode';
import { exportComponentAsPNG } from 'react-component-export-image';

const useStyles = makeStyles(theme => ({
  barcodeRefModalDiv: {
    width: 'fit-content',
  },
  modal: {
    width: '75%',
    margin: 'auto',
    marginTop: theme.spacing(10),
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(5),
  },
}));
const BarcodeDownloadModal = ({ id, open, onClose }) => {
  const classes = useStyles();
  const barcodeDownRef = useRef(`unilab-barcode-${id}`);
  const handleBarcodeDownload = () => {
    exportComponentAsPNG(barcodeDownRef, {
      fileName: id,
      html2CanvasOptions: { scale: 3 },
    });
    onClose();
  };
  return (
    <Modal
      open={open}
      aria-labelledby="barcode-modal-title"
      aria-describedby="barcode-modal-description"
      onClose={onClose}
      className={classes.modal}
    >
      <Paper className={classes.paper}>
        <Typography component="h2" variant="h4" gutterBottom align="center">
          Barcode
        </Typography>
        <Box>
          <div className={classes.barcodeRefModalDiv}>
            <div ref={barcodeDownRef}>
              <Barcode value={id} fontSize={20} />
            </div>
          </div>
        </Box>
        <Button
          variant="outlined"
          color="secondary"
          key={0}
          onClick={handleBarcodeDownload}
        >
          Save to Device
        </Button>
      </Paper>
    </Modal>
  );
};
BarcodeDownloadModal.propTypes = {
  id: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default BarcodeDownloadModal;
