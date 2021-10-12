import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Zoom } from 'react-awesome-reveal';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));

const LabAssistantBorrowedItemsCard = ({ borrowedItem }) => {
  const classes = useStyles();
  return (
    <Zoom triggerOnce>
      <Card className={classes.card}>
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            {borrowedItem.displayItemName}
          </Typography>
          <Typography variant="h5" component="h2">
            {borrowedItem.id}
          </Typography>
          <Typography className={classes.pos} color="secondary">
            Due on: {borrowedItem.dueDate}
          </Typography>
          <Typography component="p">
            Borrowed by -{' '}
            {borrowedItem.studentName.isNotEmpty
              ? borrowedItem.studentName
              : 'Name Not Set'}
            <br />
            Email - {borrowedItem.studentEmail} <br />
            Index Number - {borrowedItem.studentIndexNumber} <br />
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Email Student</Button>
        </CardActions>
      </Card>
    </Zoom>
  );
};
LabAssistantBorrowedItemsCard.propTypes = {
  borrowedItem: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default LabAssistantBorrowedItemsCard;
