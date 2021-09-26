import {
  Paper,
  Typography,
  Button,
  TextField,
  makeStyles,
  Grid,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  editDisplayItem,
  editDisplayItemResetState,
} from '../../../../store/actions/labManager/labManagerDisplayItemsActions';
import CustomLoadingIndicator from '../../../commonComponents/customLoadingIndicator';
import ErrorAlert from '../../../commonComponents/errorAlert';
import SuccessAlert from '../../../commonComponents/successAlert';

const useStyles = makeStyles(theme => ({
  paper: {
    maxWidth: '800px',
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
function EditDisplayItemForm({ displayItem, onSubmitSuccess, onClose }) {
  const classes = useStyles();
  const [name, setName] = useState(displayItem.name);
  const [description, setDescription] = useState(displayItem.description);
  const dispatch = useDispatch();

  const editLoading = useSelector(
    state => state.labManagerDisplayItems.editDisplayItemLoading,
  );
  const editSuccess = useSelector(
    state => state.labManagerDisplayItems.editDisplayItemSuccess,
  );
  const editError = useSelector(
    state => state.labManagerDisplayItems.editDisplayItemError,
  );
  const handleSubmit = e => {
    e.preventDefault();
    dispatch(editDisplayItem(name, description, displayItem.id));
  };
  const handleClose = () => {
    dispatch(editDisplayItemResetState(editSuccess));
    onClose();
  };

  return (
    <Paper
      variant="outlined"
      align="center"
      width="50%"
      className={classes.paper}
    >
      <form className={classes.form} onSubmit={handleSubmit}>
        <Typography component="h2" variant="h5" gutterBottom align="center">
          Edit DisplayItem
        </Typography>
        {editLoading ? (
          <CustomLoadingIndicator minimumHeight="40vh" />
        ) : (
          <div>
            {editSuccess ? (
              <SuccessAlert message="Saved changes successfully" />
            ) : (
              <div />
            )}
            {editError ? (
              <ErrorAlert message="Could not save changes. Please make sure the name is not a duplicate." />
            ) : (
              <div />
            )}
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="DisplayItem Name"
              id="name"
              name="name"
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
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
              value={description}
              onChange={e => setDescription(e.target.value)}
              required
            />
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Button
                  align="right"
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  onClick={handleClose}
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
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </div>
        )}
      </form>
    </Paper>
  );
}
EditDisplayItemForm.propTypes = {
  displayItem: PropTypes.objectOf(PropTypes.any).isRequired,
  onSubmitSuccess: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};
export default EditDisplayItemForm;
