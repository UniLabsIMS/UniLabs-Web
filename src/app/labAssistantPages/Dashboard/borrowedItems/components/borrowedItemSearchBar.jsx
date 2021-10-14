import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  root: {
    padding: '10px 10px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
    margin: 'auto',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
}));

const BorrowedItemSearchBar = ({ onChange, searchKey }) => {
  const classes = useStyles();

  return (
    <Paper component="form" className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="Search By Student Index"
        inputProps={{ 'aria-label': 'Search By Student Index' }}
        onChange={e => onChange(e.target.value)}
        value={searchKey}
      />
      <SearchIcon />
    </Paper>
  );
};
BorrowedItemSearchBar.propTypes = {
  onChange: PropTypes.func.isRequired,
  searchKey: PropTypes.string.isRequired,
};
export default BorrowedItemSearchBar;
