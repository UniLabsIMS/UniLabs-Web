import {
  Paper,
  Typography,
  Button,
  makeStyles,
  Grid,
  Modal,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  FormControl,
  InputLabel,
  Select,
  Box,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import WarningAlert from '../../../../commonComponents/warningAlert';

const useStyles = makeStyles(theme => ({
  paper: {
    width: '100%',
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
    letterSpacing: theme.spacing(0.2),
    marginTop: theme.spacing(1.75),
  },
  modal: {
    width: '75%',
    margin: 'auto',
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(5),
    overflow: 'scroll',
  },
  formControl: {
    width: '90%',
  },
}));
function AssignLecturerModal({ assignedLecturers, onClose, open }) {
  const classes = useStyles();
  const handleClose = () => {
    onClose();
  };

  const assignedLecturersRows = assignedLecturers.map(lecturer => (
    <TableRow key={lecturer.id}>
      <TableCell className={classes.row} align="center">
        {lecturer.email}
      </TableCell>
      <TableCell className={classes.row} align="center">
        {lecturer.firstName.concat(lecturer.lastName).length > 0
          ? `${lecturer.firstName} ${lecturer.lastName}`
          : '--------'}
      </TableCell>
      <TableCell className={classes.row} align="center">
        {lecturer.contactNo.length > 0 ? lecturer.contactNo : '--------'}
      </TableCell>
    </TableRow>
  ));

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="forgot-pass-category-modal-title"
        aria-describedby="forgot-pass-category-modal-description"
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
          <form className={classes.form}>
            <Typography component="h2" variant="h5" align="center">
              Assign Lecturers
            </Typography>
            <Typography align="center" color="error" fontSize="small">
              This Action is Irreversible.
            </Typography>
            <Box m={2} />
            <Grid container spacing={3}>
              <Grid item xs={12} sm={8}>
                <FormControl className={classes.formControl}>
                  <InputLabel id="assign-lecturer-select-label">
                    Lecturer
                  </InputLabel>
                  <Select
                    labelId="assign-lecturer-select-label"
                    id="assign-lecturer-select"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Button
                  type="submit"
                  align="right"
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  fullWidth
                >
                  Save
                </Button>
              </Grid>
            </Grid>
            <Box m={2} />
            <Typography component="h2" variant="h6" align="center">
              Assigned Lecturers
            </Typography>

            {assignedLecturersRows.length === 0 ? (
              <WarningAlert message="No lecturers currently assigned" />
            ) : (
              <Table className={classes.table} stickyHeader size="medium">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" className={classes.table_head}>
                      Email
                    </TableCell>
                    <TableCell align="center" className={classes.table_head}>
                      Name
                    </TableCell>
                    <TableCell align="center" className={classes.table_head}>
                      Contact Number
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>{assignedLecturersRows}</TableBody>
              </Table>
            )}
          </form>
        </Paper>
      </Modal>
    </div>
  );
}
AssignLecturerModal.propTypes = {
  assignedLecturers: PropTypes.arrayOf(PropTypes.any).isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};
export default AssignLecturerModal;
