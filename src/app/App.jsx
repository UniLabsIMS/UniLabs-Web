import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import AdminRoutes from '../routes/adminRoutes';
import StudentRoutes from '../routes/studentRoutes';
import LecturerRoutes from '../routes/lecturerRoutes';
import CommonRoutes from '../routes/commonRoutes';
import LabManagerRoutes from '../routes/labManagerRoutes';
import LabAssistantRoutes from '../routes/labAssistantRoutes';
import { refreshAuth } from '../store/actions/authActions';
import CustomLoadingIndicator from './commonComponents/customLoadingIndicator';
import {
  ADMIN_BASE_URL,
  LAB_MANAGER_BASE_URL,
  LAB_ASSISTANT_BASE_URL,
  STUDENT_BASE_URL,
  LECTURER_BASE_URL,
} from './constants';

function App() {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const handleBeforeUnload = e => {
    e.preventDefault();
    const message =
      'Are you sure you want to leave? All provided data will be lost.';
    e.returnValue = message;
    return message;
  };
  useEffect(() => {
    dispatch(refreshAuth());
  }, [dispatch]);

  if (auth.isAuthLoading) {
    return <CustomLoadingIndicator />;
  }
  return (
    <BrowserRouter>
      <Switch>
        <Route path={ADMIN_BASE_URL} component={AdminRoutes} />
        <Route path={STUDENT_BASE_URL} component={StudentRoutes} />
        <Route path={LECTURER_BASE_URL} component={LecturerRoutes} />
        <Route path={LAB_MANAGER_BASE_URL} component={LabManagerRoutes} />
        <Route path={LAB_ASSISTANT_BASE_URL} component={LabAssistantRoutes} />
        {/* Keep this path always ath the end of the list */}
        <Route path="/" component={CommonRoutes} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
