import {
  Paper,
  Typography,
  Button,
  makeStyles,
  Grid,
  Modal,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateProfileImage } from '../../../../store/actions/authActions';
import ImagePicker from '../../../commonComponents/imagePicker';

const useStyles = makeStyles(theme => ({
  paper: {
    maxWidth: '500px',
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
    width: '50%',
    margin: 'auto',
    marginTop: theme.spacing(10),
    [theme.breakpoints.down('sm')]: {
      width: '80%',
    },
  },
  imagePreview: {
    width: '200px',
    height: '200px',
    borderRadius: '150px',
    border: '3px solid',
    borderColor: theme.palette.secondary.main,
  },
}));
function ProfileImageUploadModal({ onClose, open }) {
  const classes = useStyles();
  const [file, setFile] = useState(undefined);

  const dispatch = useDispatch();

  const handleUpload = e => {
    e.preventDefault();
    if (file !== undefined) dispatch(updateProfileImage(file));
    setFile(undefined);
    onClose();
  };
  const handleClose = e => {
    e.preventDefault();
    setFile(undefined);
    onClose();
  };
  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="image-upload-modal-title"
        aria-describedby="image-upload-modal-description"
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
          <form className={classes.form} onSubmit={handleUpload}>
            <Typography component="h2" variant="h5" gutterBottom align="center">
              Upload New Profile Image
            </Typography>
            {file === undefined ? (
              <Typography gutterBottom align="center">
                Please select an image which is not larger than 5MB.
              </Typography>
            ) : (
              <img
                src={URL.createObjectURL(file)}
                alt={file.name}
                className={classes.imagePreview}
              />
            )}
            <ImagePicker withIcon onChange={newFile => setFile(newFile[0])} />
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
                  disabled={file === undefined}
                  type="submit"
                  align="right"
                  variant="contained"
                  color="primary"
                  className={classes.button}
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Modal>
    </div>
  );
}
ProfileImageUploadModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};
export default ProfileImageUploadModal;
