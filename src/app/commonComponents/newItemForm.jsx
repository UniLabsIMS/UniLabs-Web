import {
  makeStyles,
  Container,
  Box,
  Typography,
  Button,
} from '@material-ui/core';
import { useRef, useState } from 'react';
import Barcode from 'react-barcode';
import { exportComponentAsJPEG } from 'react-component-export-image';

const useStyles = makeStyles(theme => ({
  card: {
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    margin: 'auto',
    cursor: 'pointer',
    maxWidth: 700,
  },
  barcodeBox: {
    padding: theme.spacing(2),
  },
}));

function NewItemForm() {
  const classes = useStyles();
  const barcodeRef = useRef('unilab-barcode');
  const [barcodeState, setBarcodeState] = useState(false);
  const handleBarcodeOpen = () => setBarcodeState(true);
  const handleBarcodeClose = () => setBarcodeState(false);

  return (
    <Container>
      {barcodeState ? (
        <Box
          border={3}
          align="center"
          className={classes.barcodeBox}
          borderRadius={5}
          borderColor="secondary.main"
        >
          <Typography variant="h6">
            Generated Barcode for The New Item
          </Typography>
          <Typography color="error" fontSize="">
            <strong>
              Download the Following Barcode and Paste on the Item
            </strong>
          </Typography>
          <div ref={barcodeRef}>
            <Barcode value="f35c02a3" fontSize={20} />
          </div>
          <Box m={1} />
          <Button
            onClick={() => {
              exportComponentAsJPEG(barcodeRef);
              handleBarcodeClose();
            }}
            variant="outlined"
            color="secondary"
          >
            Download Barcode
          </Button>
        </Box>
      ) : (
        <>
          <Box
            border={3}
            borderRadius={5}
            borderColor="secondary.main"
            className={classes.card}
            fontSize="h5.fontSize"
            align="center"
            onClick={handleBarcodeOpen}
          >
            <div>Click to Generate Barcode and Add an Item</div>
          </Box>
        </>
      )}
    </Container>
  );
}
export default NewItemForm;
