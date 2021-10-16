import {
  Box,
  Button,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import ImagePicker from '../../../commonComponents/imagePicker';
import { addDisplayItem } from '../../../../store/actions/labManager/labManagerDisplayItemsActions';
import CustomLoadingIndicator from '../../../commonComponents/customLoadingIndicator';
import ErrorAlert from '../../../commonComponents/errorAlert';
import SuccessAlert from '../../../commonComponents/successAlert';

const useStyles = makeStyles(theme => ({
  form_container: {
    flexDirection: 'column',
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
  imagePreview: {
    width: 150,
    height: 80,
    border: '1px solid',
    borderColor: theme.palette.primary.main,
  },
}));

function NewDisplayItemFrom({ categoryID }) {
  const classes = useStyles();
  const [formState, setFormState] = useState(false);
  const [file, setFile] = useState(undefined);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();
  const handleFormOpen = () => {
    setFormState(true);
  };
  const handleFormClose = () => {
    setFile(undefined);
    setFormState(false);
    setName('');
    setDescription('');
    setFormState(false);
  };
  const handleSubmit = e => {
    e.preventDefault();
    dispatch(addDisplayItem(name, description, categoryID, file));
  };
  const newDspItemLoading = useSelector(
    state => state.labManagerDisplayItems.newDisplayItemLoading,
  );
  const newDspItemError = useSelector(
    state => state.labManagerDisplayItems.newDisplayItemError,
  );

  const newDspItemSuccess = useSelector(
    state => state.labManagerDisplayItems.newDisplayItemSuccess,
  );
  useEffect(() => {
    if (newDspItemSuccess) {
      handleFormClose();
    }
  }, [newDspItemSuccess]);
  if (newDspItemLoading) {
    return <CustomLoadingIndicator />;
  }
  return (
    <div className={classes.form_container}>
      {formState === true ? (
        <div>
          <Typography component="h2" variant="h6" gutterBottom align="center">
            Add New Display Item
          </Typography>
          {newDspItemError === true ? (
            <ErrorAlert message="Failed to add new display item, This may be becuase the name is a duplicate" />
          ) : (
            <div />
          )}
          <div>
            <form className={classes.form} onSubmit={handleSubmit}>
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
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  {file === undefined ? (
                    <ImagePicker
                      withIcon
                      onChange={newFile => setFile(newFile[0])}
                    />
                  ) : (
                    <Box align="center">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={file.name}
                        className={classes.imagePreview}
                      />
                      <ImagePicker onChange={newFile => setFile(newFile[0])} />
                    </Box>
                  )}
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
      <Box m={0.5} />
      {newDspItemSuccess === true ? (
        <SuccessAlert
          message="Successfully added new display item."
          onLoad={handleFormClose}
        />
      ) : (
        <div />
      )}
    </div>
  );
}
NewDisplayItemFrom.propTypes = {
  categoryID: PropTypes.string.isRequired,
};

export default NewDisplayItemFrom;
