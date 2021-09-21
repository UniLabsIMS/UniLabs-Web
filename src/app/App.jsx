import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import AdminRoutes from '../routes/adminRoutes';
import CommonRoutes from '../routes/commonRoutes';
import LabManagerRoutes from '../routes/labManagerRoutes';
import { refreshAuth } from '../store/actions/authActions';
import CustomLoadingIndicator from './commonComponents/customLoadingIndicator';
import { ADMIN_BASE_URL, LAB_MANAGER_BASE_URL } from './constants';

function App() {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(refreshAuth());
  }, [dispatch]);

  if (auth.isLoading) {
    return <CustomLoadingIndicator />;
  }
  return (
    <BrowserRouter>
      <Switch>
        <Route path={ADMIN_BASE_URL} component={AdminRoutes} />
        <Route path={LAB_MANAGER_BASE_URL} component={LabManagerRoutes} />
        {/* Keep this path always ath the end of the list */}
        <Route path="/" component={CommonRoutes} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
