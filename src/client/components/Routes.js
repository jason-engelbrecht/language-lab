import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import Users from './pages/Users';
import Uploads from './pages/Uploads';
import Login from './pages/Login';
import Register from './pages/Register';
import TopNavigation from './topNavigation';
import SideNavigation from './sideNavigation';
import Footer from './Footer';
import withAuth from '../withAuth';

class Routes extends React.Component {

  //render main nav with a component
  renderNavWith(Component) {
    return (
      <div className="flexible-content">
        <TopNavigation />
        <div id="sideNav">
          <SideNavigation />
        </div>
        <main id="content" className="p-5">
          <Component />
        </main>
        <Footer />
      </div>
    );
  };

  render() {
    return (
      <Switch>
        <Route path='/' exact>
          <Redirect to={{ pathname: "/login" }} />
        </Route>
        <Route path='/login' exact>
          <Login/>
        </Route>

        <Route path='/register' exact>
          <Register/>
        </Route>

        <Route path='/dashboard' exact>
          {this.renderNavWith(withAuth(DashboardPage))}
        </Route>

        <Route path='/users' exact>
          {this.renderNavWith(withAuth(Users))}
        </Route>

        <Route path='/uploads' exact>
          {this.renderNavWith(withAuth(Uploads))}
        </Route>
      </Switch>
    );
  };
}

export default Routes;
