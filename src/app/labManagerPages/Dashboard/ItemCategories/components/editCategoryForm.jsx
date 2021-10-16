import {
  Paper,
  Typography,
  Button,
  TextField,
  makeStyles,
  Grid,
  Modal,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  editCategory,
  editCategoryResetState,
} from '../../../../../store/actions/labManager/labManagerCategoriesActions';
import CustomLoadingIndicator from '../../../../commonComponents/customLoadingIndicator';
import ErrorAlert from '../../../../commonComponents/errorAlert';
import SuccessAlert from '../../../../commonComponents/successAlert';

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
  modal: {
    width: '85%',
    margin: 'auto',
    marginTop: theme.spacing(10),
  },
}));
function EditCategoryForm({ category, onSubmitSuccess, onClose, open }) {
  const classes = useStyles();
  const [name, setName] = useState(category.name);
  const [description, setDescription] = useState(category.description);
  const dispatch = useDispatch();

  const editLoading = useSelector(
    state => state.labManagerCategories.editCategoryLoading,
  );
  const editSuccess = useSelector(
    state => state.labManagerCategories.editCategorySuccess,
  );
  const editError = useSelector(
    state => state.labManagerCategories.editCategoryError,
  );
  const handleSubmit = e => {
    e.preventDefault();
    dispatch(editCategory(name, description, category.id));
  };
  const handleClose = () => {
    dispatch(editCategoryResetState(editSuccess));
    onClose();
  };

  return (
    <Modal
      open={open}
      aria-labelledby="edit-category-modal-title"
      aria-describedby="edit-category-modal-description"
      align="center"
      className={classes.modal}
      onClose={handleClose}
    >
      <Paper
        variant="outlined"
        align="center"
        width="50%"
        className={classes.paper}
      >
        <form className={classes.form} onSubmit={handleSubmit}>
          <Typography component="h2" variant="h5" gutterBottom align="center">
            Edit Category
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
                label="Category Name"
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
    </Modal>
  );
}
EditCategoryForm.propTypes = {
  category: PropTypes.objectOf(PropTypes.any).isRequired,
  onSubmitSuccess: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};
export default EditCategoryForm;
