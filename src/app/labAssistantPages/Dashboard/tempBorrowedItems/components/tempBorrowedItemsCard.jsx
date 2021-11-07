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

const LabAssistantTempBorrowedItemsCard = ({ tempBorrowedItem }) => {
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
            {tempBorrowedItem.displayItemName}
          </Typography>
          <Typography variant="h5" component="h2">
            {tempBorrowedItem.id}
          </Typography>
          <Typography className={classes.pos} color="secondary">
            Due on : {tempBorrowedItem.dueDate}
          </Typography>
          <Typography component="p">
            Borrowed by -{' '}
            {tempBorrowedItem.studentName.isNotEmpty
              ? tempBorrowedItem.studentName
              : 'Name Not Set'}
            <br />
            Email - {tempBorrowedItem.studentEmail} <br />
            Index Number - {tempBorrowedItem.studentIndexNumber} <br />
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            onClick={() => {
              window.location.href = `mailto:${tempBorrowedItem.studentEmail}`;
            }}
          >
            Email Student
          </Button>
        </CardActions>
      </Card>
    </Zoom>
  );
};
LabAssistantTempBorrowedItemsCard.propTypes = {
  tempBorrowedItem: PropTypes.objectOf(PropTypes.any).isRequired,
};
export default LabAssistantTempBorrowedItemsCard;
