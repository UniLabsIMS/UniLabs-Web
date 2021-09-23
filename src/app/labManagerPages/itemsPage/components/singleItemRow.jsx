import { TableCell, TableRow, makeStyles, Button } from '@material-ui/core';
import PropTypes from 'prop-types';

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

  return (
    <TableRow className={classes.row_height}>
      <TableCell align="center" className={classes.row}>
        {item.id}
      </TableCell>
      <TableCell align="center" className={classes.row}>
        {item.state}
      </TableCell>
      <TableCell align="center" className={classes.row}>
        {item.addedOn}
      </TableCell>
      <TableCell align="center">
        <Button variant="outlined" color="primary" key={0}>
          Download
        </Button>
      </TableCell>
      <TableCell align="center">
        <Button variant="outlined" color="secondary" key={0}>
          Delete Item
        </Button>
      </TableCell>
    </TableRow>
  );
}
SingleItemRow.propTypes = {
  item: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default SingleItemRow;
