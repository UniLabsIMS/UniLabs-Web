import { Breadcrumbs, Hidden, makeStyles } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  Breadcrumbs: {
    fontSize: 24,
    paddingBottom: theme.spacing(3),
    textDecoration: 'None',
  },
}));

function BreadcrumbsWrapper({ children }) {
  const classes = useStyles();
  return (
    <Hidden smDown>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="large" />}
        aria-label="breadcrumb"
        className={classes.Breadcrumbs}
      >
        {children}
      </Breadcrumbs>
    </Hidden>
  );
}
BreadcrumbsWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
};

export default BreadcrumbsWrapper;
