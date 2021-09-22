import {
  Box,
  Button,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import { useState } from 'react';
import ImagePicker from '../../../commonComponents/imagePicker';

const useStyles = makeStyles(theme => ({
  form_container: {
    flexDirection: 'column',
    padding: theme.spacing(3),
    margin: 'auto',
    maxWidth: 900,
  },
  form: {
    marginTop: theme.spacing(1),
  },
  card: {
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
    margin: 'auto',
    cursor: 'pointer',
  },
  buttons: {
    margin: 'auto',
    display: 'flex',
  },
  content: {
    paddingBottom: theme.spacing(0),
  },
}));

function NewDisplayItemFrom() {
  const classes = useStyles();
  const [formState, setFormState] = useState(false);
  const handleFormOpen = () => {
    setFormState(true);
  };
  const handleFormClose = () => {
    setFormState(false);
  };
  return (
    <div className={classes.form_container}>
      {formState === true ? (
        <div>
          <Typography component="h2" variant="h6" gutterBottom align="center">
            Add New Display Item
          </Typography>
          <form className={classes.form}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  color="secondary"
                  fullWidth
                  label="Display Item Name"
                  name="name"
                  id="name"
                  type="text"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <ImagePicker withIcon onChange={newFile => null} withPreview />
              </Grid>
            </Grid>
            <Grid container spacing={3} alignItems="flex-end">
              <Grid item xs={12} sm={8}>
                <TextField
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  multiline
                  minRows="3"
                  label="Description"
                  id="description"
                  name="description"
                  type="text"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  onClick={handleFormClose}
                >
                  Close
                </Button>
                <Box m={2} />
                <Button
                  type="submit"
                  variant="outlined"
                  color="secondary"
                  fullWidth
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      ) : (
        <Box
          border={3}
          borderRadius={5}
          borderColor="primary.main"
          className={classes.card}
          fontSize="h5.fontSize"
          align="center"
          onClick={handleFormOpen}
        >
          <div>Click to Add New Display Item</div>
        </Box>
      )}
    </div>
  );
}

export default NewDisplayItemFrom;
