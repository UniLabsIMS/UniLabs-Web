import {
  makeStyles,
  Container,
  Box,
  Typography,
  Button,
} from '@material-ui/core';
import { useRef } from 'react';
import Barcode from 'react-barcode';
import { exportComponentAsPNG } from 'react-component-export-image';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import CustomLoadingIndicator from '../../../commonComponents/customLoadingIndicator';
import ErrorAlert from '../../../commonComponents/errorAlert';
import {
  addItem,
  cleanNewItemState,
} from '../../../../store/actions/labManager/labManagerItemsActions';

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
  barcodeRefDiv: {
    width: 'fit-content',
  },
}));

function NewItemForm({ displayItemID }) {
  const classes = useStyles();
  const barcodeRef = useRef('unilab-barcode');
  const dispatch = useDispatch();

  const newItemLoading = useSelector(
    state => state.labManagerItems.newItemLoading,
  );
  const newItemError = useSelector(state => state.labManagerItems.newItemError);

  const newItemSuccess = useSelector(
    state => state.labManagerItems.newItemSuccess,
  );
  const newItemID = useSelector(state => state.labManagerItems.newItemID);
  const handleSubmit = () => dispatch(addItem(displayItemID));
  const handleCleanBarcode = () => {
    exportComponentAsPNG(barcodeRef, {
      fileName: newItemID,
      html2CanvasOptions: { scale: 3 },
    });
    dispatch(cleanNewItemState());
  };
  if (newItemLoading) {
    return <CustomLoadingIndicator />;
  }
  return (
    <Container>
      {newItemSuccess ? (
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
          <div className={classes.barcodeRefDiv}>
            <div ref={barcodeRef}>
              <Barcode value={newItemID} fontSize={20} />
            </div>
          </div>
          <Box m={1} />
          <Button
            onClick={() => {
              handleCleanBarcode();
            }}
            variant="outlined"
            color="secondary"
          >
            Download Barcode
          </Button>
        </Box>
      ) : (
        <div>
          {newItemError === true ? (
            <ErrorAlert message="Failed to add new item.Try again later" />
          ) : (
            <div />
          )}
          <Box
            border={3}
            borderRadius={5}
            borderColor="secondary.main"
            className={classes.card}
            fontSize="h5.fontSize"
            align="center"
            onClick={handleSubmit}
          >
            <div>Click to Generate Barcode and Add an Item</div>
          </Box>
        </div>
      )}
    </Container>
  );
}
NewItemForm.propTypes = {
  displayItemID: PropTypes.string.isRequired,
};
export default NewItemForm;
