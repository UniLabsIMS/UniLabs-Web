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
    fontSize: 20,
  },
}));

function SingleItemRow({ item }) {
  const classes = useStyles();

  return (
    <TableRow className={classes.row_height}>
      <TableCell align="center" className={classes.row}>
        165748345-76748-X
      </TableCell>
      <TableCell align="center" className={classes.row}>
        Borrowed
      </TableCell>
      <TableCell align="center" className={classes.row}>
        2021/08/30
      </TableCell>
      <TableCell align="center">
        <Button
          variant="outlined"
          color="secondary"
          size="small"
          key={0}
          className={classes.row}
        >
          Download
        </Button>
      </TableCell>
    </TableRow>
  );
}
SingleItemRow.propTypes = {
  item: PropTypes.number.isRequired,
};

export default SingleItemRow;
