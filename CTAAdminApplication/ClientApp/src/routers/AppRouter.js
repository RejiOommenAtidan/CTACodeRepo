import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import HelpPage from '../components/HelpPage';
import NotFoundPage from '../components/NotFoundPage';
import Header from '../components/Header';
import GoogleLogin from '../components/GoogleLogin';
import MaterialUIPlaygroundPage from '../components/Materialuiplayground';
import UserDashboard from '../components/UserDashboard';
import AddUser from '../components/AddUser';

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Header/>
      <Switch>
        <Route path="/" component={GoogleLogin} exact={true} />
        <Route path="/help" component={HelpPage} />
        <Route path="/create" component={AddUser} />
        <Route path="/materialui" component={MaterialUIPlaygroundPage} />
        <Route path="/dashboard" component={UserDashboard} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;
