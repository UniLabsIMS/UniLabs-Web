import {
  Button,
  CssBaseline,
  makeStyles,
  Container,
  Typography,
  TextField,
} from '@material-ui/core';
import { useState } from 'react';
import { Zoom } from 'react-awesome-reveal';

const useStyles = makeStyles(theme => ({
  bigContainer: {
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  paper: {
    width: '100%',
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  profilePicContainer: {
    marginTop: theme.spacing(2),
  },
  profilePic: {
    width: 250,
    borderRadius: 150,
  },
  form: {
    width: '60%',
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form2: {
    width: '60%',
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
  },
  form1: {
    width: '100%',
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  loginForm: {
    width: '100%',
    marginTop: theme.spacing(0),
    display: 'flex',
    flexDirection: 'column',
  },
  changeDetailsBtn: {
    width: '60%',
    margin: theme.spacing(1, 0, 2),
    padding: theme.spacing(1),
  },
  typeWriterWrapper: {
    fontWeight: 'bold',
    color: theme.palette.secondary.main,
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
  formLine: {
    margin: theme.spacing(0),
  },
  formLabel: {
    margin: theme.spacing(0),
    marginTop: theme.spacing(1),
  },
  formTextArea: {
    marginTop: theme.spacing(0.5),
  },
  saveBtn: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(1),
  },
}));

const ProfileDetailsCard = () => {
  const classes = useStyles();
  //   const [profileDetails, setProfileDetails] = useState({
  //     email: '180978@uom.lk',
  //     firstName: 'Gowantha',
  //     lastName: 'Charithal',
  //     contactNum: '0711234567',
  //     image: '/images/Avatar.svg',
  //   });
  const profileDetails = {
    email: '180978@uom.lk',
    firstName: 'Gowantha',
    lastName: 'Charithal',
    contactNum: '0711234567',
    image: '/images/Avatar.svg',
  };
  const [editable, setEditable] = useState(false);
  const [changePwdClicked, setChangePwdClicked] = useState(false);

  const handleSaveDetails = e => {
    e.preventDefault();
  };

  return (
    <div>
      <Container component="main" className={classes.bigContainer}>
        <CssBaseline />
        <div className={classes.paper}>
          <Zoom triggerOnce className={classes.profilePicContainer}>
            <img
              src={profileDetails.image}
              alt="Profile Pic"
              className={classes.profilePic}
            />
          </Zoom>
          {!changePwdClicked && !editable && (
            <div className={classes.loginForm}>
              <Zoom triggerOnce className={classes.form1}>
                <form className={classes.form} noValidate>
                  <div className={classes.biggerCont}>
                    <div className={classes.profileDetailBox}>
                      <div className={classes.profileDetailContainer}>
                        <h2 className={classes.profileDetail}>Email</h2>
                        <h2 className={classes.profileDetail}>Name</h2>
                        <h2 className={classes.profileDetail}>
                          Contact Number
                        </h2>
                      </div>
                      <div className={classes.profileDetailContainer}>
                        <h2 className={classes.profileDetail}> :</h2>
                        <h2 className={classes.profileDetail}> :</h2>
                        <h2 className={classes.profileDetail}> : </h2>
                      </div>
                      <div className={classes.profileDetailValContainer}>
                        <h2 className={classes.profileDetailVal}>
                          {profileDetails.email}
                        </h2>
                        <h2 className={classes.profileDetailVal}>
                          {`${profileDetails.firstName} ${profileDetails.lastName}`}
                        </h2>
                        <h2 className={classes.profileDetailVal}>
                          {profileDetails.contactNum}
                        </h2>
                      </div>
                    </div>
                  </div>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.changeDetailsBtn}
                    onClick={() => setEditable(true)}
                  >
                    Change Profile Details
                  </Button>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.changeDetailsBtn}
                    onClick={() => setChangePwdClicked(true)}
                  >
                    Change Password
                  </Button>
                </form>
              </Zoom>
            </div>
          )}
          {!changePwdClicked && editable && (
            <div className={classes.loginForm}>
              <Zoom triggerOnce className={classes.form1}>
                <Typography component="h1" variant="h5">
                  Change Profile Details
                </Typography>
                <form
                  className={classes.form2}
                  noValidate
                  onSubmit={handleSaveDetails}
                >
                  <div className={classes.formLine}>
                    <h3 className={classes.formLabel}>Email</h3>
                    <TextField
                      disabled
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      name="email"
                      defaultValue={profileDetails.email}
                      type="email"
                      id="email"
                      className={classes.formTextArea}
                      // value={email}
                      // onChange={e => setEmail(e.target.value)}
                    />
                  </div>
                  <div className={classes.formLine}>
                    <h3 className={classes.formLabel}>First Name</h3>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="firstName"
                      defaultValue={profileDetails.firstName}
                      name="firstName"
                      className={classes.formTextArea}
                      // value={firstName}
                      // onChange={e => setFirstName(e.target.value)}
                    />
                  </div>
                  <div className={classes.formLine}>
                    <h3 className={classes.formLabel}>Last Name</h3>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="lastName"
                      defaultValue={profileDetails.lastName}
                      name="lastName"
                      className={classes.formTextArea}
                      // value={lastName}
                      // onChange={e => setLastName(e.target.value)}
                    />
                  </div>
                  <div className={classes.formLine}>
                    <h3 className={classes.formLabel}>Contact Number</h3>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      name="contactNum"
                      defaultValue={profileDetails.contactNum}
                      type="contactNum"
                      id="contactNum"
                      className={classes.formTextArea}
                      // value={password}
                      // onChange={e => setContactNum(e.target.value)}
                    />
                  </div>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.saveBtn}
                    onClick={() => setEditable(false)}
                  >
                    Save Changes
                  </Button>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.saveBtn}
                    onClick={() => setEditable(false)}
                  >
                    Cancel
                  </Button>
                </form>
              </Zoom>
            </div>
          )}
          {changePwdClicked && (
            <div className={classes.loginForm}>
              <Zoom triggerOnce className={classes.form1}>
                <Typography component="h1" variant="h5">
                  Change Password
                </Typography>
                <form
                  className={classes.form2}
                  noValidate
                  //   onSubmit={handleSaveDetails}
                >
                  <div className={classes.formLine}>
                    <TextField
                      disabled
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      name="curretPwd"
                      label="Current Password"
                      type="curretPwd"
                      id="curretPwd"
                      className={classes.formTextArea}
                      // value={curretPwd}
                      // onChange={e => setEmail(e.target.value)}
                    />
                  </div>
                  <div className={classes.formLine}>
                    <TextField
                      disabled
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      name="newPwd"
                      label="New Password"
                      type="newPwd"
                      id="newPwd"
                      className={classes.formTextArea}
                      // value={newPwd}
                      // onChange={e => setEmail(e.target.value)}
                    />
                  </div>
                  <div className={classes.formLine}>
                    <TextField
                      disabled
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      name="confirmNewPwd"
                      label="Confirm New Password"
                      type="confirmNewPwd"
                      id="confirmNewPwd"
                      className={classes.formTextArea}
                      // value={confirmNewPwd}
                      // onChange={e => setEmail(e.target.value)}
                    />
                  </div>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.saveBtn}
                    onClick={() => setChangePwdClicked(false)}
                  >
                    Change Password
                  </Button>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.saveBtn}
                    onClick={() => setChangePwdClicked(false)}
                  >
                    Cancel
                  </Button>
                </form>
              </Zoom>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

// CategoryCard.propTypes = {
//   category: PropTypes.objectOf(PropTypes.elements).isRequired,
// };

export default ProfileDetailsCard;
