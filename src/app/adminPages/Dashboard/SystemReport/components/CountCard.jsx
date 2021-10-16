import { Card, CardContent, makeStyles, Typography } from '@material-ui/core';
import { Zoom } from 'react-awesome-reveal';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  card: {
    width: 200,
    height: 200,
    paddingBottom: theme.spacing(1),
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '0.5px solid',
    borderColor: theme.palette.secondary.main,
  },
  cardContent: {},
}));
const CountCard = ({ title, count, total, showPercentage }) => {
  const classes = useStyles();
  return (
    <Zoom triggerOnce>
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Typography align="center" variant="h5">
            {title}
          </Typography>
          <Typography variant="h3" align="center">
            {count < 10 ? `0${count}` : count}
          </Typography>
          {showPercentage ? (
            <Typography color="primary" align="center">
              Percentage: {((count / total) * 100).toFixed(2)}%
            </Typography>
          ) : (
            <div />
          )}
        </CardContent>
      </Card>
    </Zoom>
  );
};
CountCard.defaultProps = {
  showPercentage: false,
  total: 0,
};
CountCard.propTypes = {
  title: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  showPercentage: PropTypes.bool,
  total: PropTypes.number,
};
export default CountCard;
