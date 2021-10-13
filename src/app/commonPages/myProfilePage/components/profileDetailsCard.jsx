import {
  Button,
  makeStyles,
  Container,
  Typography,
  Box,
} from '@material-ui/core';
import { useState } from 'react';
import { Zoom } from 'react-awesome-reveal';
import { useSelector } from 'react-redux';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import ChangePasswordForm from './changePasswordForm';
import UpdateProfileDetailsForm from './updateProfileDetailsForm';

import SuccessAlert from '../../../commonComponents/successAlert';
import ErrorAlert from '../../../commonComponents/errorAlert';

const useStyles = makeStyles(theme => ({
  container: {
    width: '100%',
    marginTop: 'auto',
    flexDirection: 'column',
    alignItems: 'center',
  },
  profilePicContainer: {
    alignItems: 'center',
    position: 'relative',
    width: '220px',
    borderRadius: 150,
    '&:hover': {
      cursor: 'pointer',
    },
  },
  profilePic: {
    width: '100%',
    borderRadius: 150,
    alignItems: 'center',
    display: 'block',
    border: '3px solid',
    borderColor: theme.palette.secondary.main,
    backfaceVisibility: 'hidden',
  },
  profilePicOverlay: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    top: '50%',
    left: '50%',
    borderRadius: 150,
    transition: '.5s ease',
    backgroundColor: 'black',
    opacity: 0,
    transform: `translate(${-50}%, ${-50}%)`,
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    '&:hover': {
      opacity: 0.8,
    },
  },
  biggerCont: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  profileDetailBox: {
    display: 'flex',
    flexDirection: 'row',
  },
  profileDetailContainer: {
    margin: theme.spacing(1),
  },
  profileDetailValContainer: {
    margin: theme.spacing(1),
  },
  btn: {
    padding: theme.spacing(1),
    width: '50%',
    [theme.breakpoints.down('sm')]: {
      width: '80%',
    },
    align: 'center',
  },
  addPicIcon: {
    color: 'white',
    fontSize: 48,
  },
  addPicText: {
    color: 'white',
    fontSize: 18,
  },
}));

const ProfileDetailsCard = () => {
  const classes = useStyles();

  const firstName = useSelector(state => state.auth.user.firstName);
  const lastName = useSelector(state => state.auth.user.lastName);
  const email = useSelector(state => state.auth.user.email);
  const contactNumber = useSelector(state => state.auth.user.contactNumber);
  const image = useSelector(state => state.auth.user.image);

  const updateProfileSuccess = useSelector(
    state => state.auth.updateProfileSuccess,
  );
  const changePasswordSuccess = useSelector(
    state => state.auth.changePasswordSuccess,
  );
  const changePasswordError = useSelector(
    state => state.auth.changePasswordError,
  );
  const updateProfileError = useSelector(
    state => state.auth.updateProfileError,
  );

  const [editable, setEditable] = useState(false);
  const [changePwdClicked, setChangePwdClicked] = useState(false);

  let childComponent = null;
  if (editable && !changePwdClicked) {
    childComponent = (
      <UpdateProfileDetailsForm
        onSave={() => setEditable(false)}
        onCancel={() => setEditable(false)}
      />
    );
  } else if (changePwdClicked && !editable) {
    childComponent = (
      <ChangePasswordForm
        onSave={() => setChangePwdClicked(false)}
        onCancel={() => setChangePwdClicked(false)}
      />
    );
  } else {
    childComponent = (
      <Box>
        <Zoom triggerOnce>
          <div className={classes.biggerCont}>
            {updateProfileSuccess ? (
              <SuccessAlert message="Changes saved successfully." />
            ) : (
              <div />
            )}
            {changePasswordSuccess ? (
              <SuccessAlert message="Password changed successfully." />
            ) : (
              <div />
            )}

            {changePasswordError ? (
              <ErrorAlert message="Failed to change the password.Please try again later." />
            ) : (
              <div />
            )}
            {updateProfileError ? (
              <ErrorAlert message="Failed to save changes.Please try again later." />
            ) : (
              <div />
            )}
            <div className={classes.profileDetailBox}>
              <div className={classes.profileDetailContainer}>
                <Typography variant="h6" className={classes.profileDetail}>
                  Email
                </Typography>
                <Typography variant="h6" className={classes.profileDetail}>
                  Name
                </Typography>
                <Typography variant="h6" className={classes.profileDetail}>
                  Contact Number
                </Typography>
              </div>
              <div className={classes.profileDetailContainer}>
                <Typography variant="h6" className={classes.profileDetail}>
                  {' '}
                  :
                </Typography>
                <Typography variant="h6" className={classes.profileDetail}>
                  {' '}
                  :
                </Typography>
                <Typography variant="h6" className={classes.profileDetail}>
                  {' '}
                  :{' '}
                </Typography>
              </div>
              <div className={classes.profileDetailValContainer}>
                <Typography variant="h6" className={classes.profileDetailVal}>
                  {email}
                </Typography>
                <Typography variant="h6" className={classes.profileDetailVal}>
                  {firstName.concat(lastName).trim().length > 0
                    ? `${firstName} ${lastName}`
                    : 'Not Set'}
                </Typography>
                <Typography variant="h6" className={classes.profileDetailVal}>
                  {contactNumber.length > 0 ? contactNumber : 'Not Set'}
                </Typography>
              </div>
            </div>
          </div>
          <Box m={1} />
          <Box align="center">
            <Button
              variant="contained"
              color="primary"
              className={classes.btn}
              onClick={() => setEditable(true)}
            >
              Change Profile Details
            </Button>
            <Box m={1} />
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              className={classes.btn}
              onClick={() => setChangePwdClicked(true)}
            >
              Change Password
            </Button>
          </Box>
        </Zoom>
      </Box>
    );
  }
  return (
    <Container className={classes.container}>
      <Zoom triggerOnce>
        <Box align="center">
          <div className={classes.profilePicContainer}>
            <img
              src={image != null ? image : '/images/default-avatar.jpg'}
              alt="Profile Pic"
              className={classes.profilePic}
            />
            <Box className={classes.profilePicOverlay}>
              <AddAPhotoIcon className={classes.addPicIcon} />
              <Typography align="center" className={classes.addPicText}>
                Upload New
              </Typography>
            </Box>
          </div>
        </Box>
      </Zoom>
      <Zoom triggerOnce>{childComponent}</Zoom>
    </Container>
  );
};

// CategoryCard.propTypes = {
//   category: PropTypes.objectOf(PropTypes.elements).isRequired,
// };

export default ProfileDetailsCard;
