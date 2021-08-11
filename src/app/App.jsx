import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CommonRoutes from '../routes/commonRoutes';
import Error404 from './commonComponents/error404';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/404" component={Error404} />
        <Route path="/" component={CommonRoutes} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
