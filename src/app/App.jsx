import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AdminRoutes from '../routes/adminRoutes';
import CommonRoutes from '../routes/commonRoutes';
import LabManagerRoutes from '../routes/labManagerRoutes';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/admin" component={AdminRoutes} />
        <Route path="/lab_manager" component={LabManagerRoutes} />
        {/* Keep this path always ath the end of the list */}
        <Route path="/" component={CommonRoutes} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
