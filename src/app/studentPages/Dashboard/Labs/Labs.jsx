import { Grid, makeStyles, Typography } from '@material-ui/core';
import { Zoom } from 'react-awesome-reveal';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import LabCard from './components/labCard';
import CustomLoadingIndicator from '../../../commonComponents/customLoadingIndicator';
import ErrorAlert from '../../../commonComponents/errorAlert';
import { fetchLabs } from '../../../../store/actions/student/studentLabsActions';

const useStyles = makeStyles(theme => ({
  gridItem: {
    width: '28%',
  },
}));

function Labs() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isLabsLoading = useSelector(state => state.studentLabs.isLabsLoading);
  const isLabsError = useSelector(state => state.studentLabs.isLabsError);
  const labsLst = useSelector(state => state.studentLabs.labs);
  const reload = useSelector(state => state.studentLabs.reloadLabs);
  useEffect(() => {
    dispatch(fetchLabs());
  }, [dispatch, reload]);

  const labs = labsLst.map(l => (
    <Grid item key={l.id} className={classes.gridItem}>
      <LabCard lab={l} />
    </Grid>
  ));

  return (
    <div>
      <Zoom triggerOnce>
        <Typography component="h2" variant="h4" gutterBottom align="center">
          All Labs
        </Typography>
      </Zoom>
      {isLabsError ? (
        <ErrorAlert message="Failed to load labs" />
      ) : (
        <div>
          {isLabsLoading ? (
            <CustomLoadingIndicator minimumHeight="60vh" />
          ) : (
            <Grid
              container
              spacing={3}
              justifyContent="space-around"
              alignItems="center"
              direction="row"
            >
              {labs}
            </Grid>
          )}
        </div>
      )}
    </div>
  );
}

export default Labs;
