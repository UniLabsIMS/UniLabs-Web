import {
  Paper,
  Typography,
  Button,
  TextField,
  makeStyles,
  Grid,
} from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(5),
  },
  form: {
    width: '95%',
    marginTop: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1, 0, 1),
    letterSpacing: theme.spacing(0.2),
  },
}));
function EditCategoryForm({ onSubmitSuccess, onClose }) {
  const classes = useStyles();

  return (
    <Paper
      variant="outlined"
      align="center"
      width="50%"
      className={classes.paper}
    >
      <form className={classes.form}>
        <Typography
          component="h2"
          variant="h6"
          color="primary"
          gutterBottom
          align="center"
        >
          Edit Category
        </Typography>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="Category Name"
          id="name"
          name="name"
          type="text"
          value="Category"
          required
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          multiline
          minRows={3}
          label="Description"
          name="description"
          id="description"
          type="text"
          value="Description"
          required
        />
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Button
              align="right"
              variant="contained"
              color="secondary"
              className={classes.button}
              onClick={onClose}
            >
              Close
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              type="submit"
              align="right"
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={onSubmitSuccess}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}
EditCategoryForm.propTypes = {
  onSubmitSuccess: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};
export default EditCategoryForm;
