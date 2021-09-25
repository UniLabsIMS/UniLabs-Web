import { TableCell, TableRow, makeStyles, Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import BarcodeDownloadModal from '../../../commonComponents/barcodeDownloadModal';
import { deleteItem } from '../../../../store/actions/labManager/labManagerItemsActions';

const useStyles = makeStyles(theme => ({
  download_button: {
    margin: theme.spacing(1, 0, 1),
    letterSpacing: theme.spacing(0.2),
  },
  active_color: {
    color: theme.palette.secondary.main,
  },
  row_height: {
    height: theme.spacing(10),
  },
  timeSpan: {
    whiteSpace: 'nowrap',
    wordBreak: 'strict',
  },
  row: {
    fontSize: 18,
  },
}));

function SingleItemRow({ item }) {
  const classes = useStyles();
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const dispatch = useDispatch();
  const handleOnDelete = id => {
    dispatch(deleteItem(id));
  };

  return (
    <TableRow className={classes.row_height}>
      <TableCell align="center" className={classes.row}>
        {item.id}
      </TableCell>
      <TableCell align="center" className={classes.row}>
        {item.state}
      </TableCell>
      <TableCell align="center" className={classes.row}>
        {item.addedOn.toString().slice(0, 10)}
      </TableCell>
      <TableCell align="center">
        <Button
          variant="outlined"
          color="primary"
          key={0}
          onClick={() => setDownloadModalOpen(true)}
        >
          Download
        </Button>
      </TableCell>
      <TableCell align="center">
        <Button
          variant="outlined"
          color="secondary"
          key={0}
          onClick={() => handleOnDelete(item.id)}
        >
          Delete Item
        </Button>

        <BarcodeDownloadModal
          id={item.id}
          open={downloadModalOpen}
          onClose={() => setDownloadModalOpen(false)}
        />
      </TableCell>
    </TableRow>
  );
}
SingleItemRow.propTypes = {
  item: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default SingleItemRow;
