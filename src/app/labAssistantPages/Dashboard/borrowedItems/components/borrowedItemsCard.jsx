import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Zoom } from 'react-awesome-reveal';

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

export default function LabAssistantBorrowedItemsCard() {
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
            Display Item Name
          </Typography>
          <Typography variant="h5" component="h2">
            f43abdcfer
          </Typography>
          <Typography className={classes.pos} color="secondary">
            Due on : 2021/09/27
          </Typography>
          <Typography component="p">
            borrowed by - Student Name <br />
            email - student@gmail.com <br />
            index number - 180594V <br />
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Email Student</Button>
        </CardActions>
      </Card>
    </Zoom>
  );
}
