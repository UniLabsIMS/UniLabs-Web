import { makeStyles, Container, Box } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  card: {
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    margin: 'auto',
    cursor: 'pointer',
    maxWidth: 700,
  },
}));

function NewItemForm() {
  const classes = useStyles();

  return (
    <Container>
      <Box
        border={3}
        borderRadius={5}
        borderColor="secondary.main"
        className={classes.card}
        fontSize="h5.fontSize"
        align="center"
      >
        <div>Click to Generate Barcode and Add an Item</div>
      </Box>
    </Container>
  );
}
export default NewItemForm;
