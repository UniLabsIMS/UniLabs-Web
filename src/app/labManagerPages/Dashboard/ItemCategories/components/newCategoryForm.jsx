import {
  Box,
  Button,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addCategory } from '../../../../../store/actions/labManager/labManagerCategoriesActions';
import ImagePicker from '../../../../commonComponents/imagePicker';
import CustomLoadingIndicator from '../../../../commonComponents/customLoadingIndicator';
import ErrorAlert from '../../../../commonComponents/errorAlert';
import SuccessAlert from '../../../../commonComponents/successAlert';

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

function NewCategoryFrom() {
  const classes = useStyles();
  const [formState, setFormState] = useState(false);
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();
  const handleFormOpen = () => {
    setFormState(true);
  };
  const handleFormClose = () => {
    setFile(null);
    setName('');
    setDescription('');
    setFormState(false);
  };
  const handleSubmit = e => {
    e.preventDefault();
    dispatch(addCategory(name, description, file));
  };
  const newCatLoading = useSelector(
    state => state.labManagerCategories.newCategoryLoading,
  );
  const newCatError = useSelector(
    state => state.labManagerCategories.newCategoryError,
  );

  const newCatSuccess = useSelector(
    state => state.labManagerCategories.newCategorySuccess,
  );
  useEffect(() => {
    if (newCatSuccess) {
      handleFormClose();
    }
  }, [newCatSuccess]);
  if (newCatLoading) {
    return <CustomLoadingIndicator />;
  }
  return (
    <div className={classes.form_container}>
      {formState === true ? (
        <div>
          <Typography component="h2" variant="h6" gutterBottom align="center">
            Add New Category
          </Typography>
          {newCatError === true ? (
            <ErrorAlert message="Failed to add new category, This may be becuase the category name is a duplicate" />
          ) : (
            <div />
          )}
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  color="secondary"
                  fullWidth
                  label="Category Name"
                  name="name"
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <ImagePicker
                  withIcon
                  onChange={newFile => setFile(newFile[0])}
                  withPreview
                />
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
                  value={description}
                  onChange={e => setDescription(e.target.value)}
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
        <div>
          <Box
            border={3}
            borderRadius={5}
            borderColor="primary.main"
            className={classes.card}
            fontSize="h5.fontSize"
            align="center"
            onClick={handleFormOpen}
          >
            <div>Click to Add New Category</div>
          </Box>
        </div>
      )}
      <Box m={0.5} />
      {newCatSuccess === true ? (
        <SuccessAlert
          message="Successfully added new category."
          onLoad={handleFormClose}
        />
      ) : (
        <div />
      )}
    </div>
  );
}

export default NewCategoryFrom;
