import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AdminRoutes from '../routes/adminRoutes';
import CommonRoutes from '../routes/commonRoutes';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/admin" component={AdminRoutes} />
        {/* Keep this path always ath the end of the list */}
        <Route path="/" component={CommonRoutes} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
