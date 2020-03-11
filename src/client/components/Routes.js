import React from 'react';
import { Route, Switch } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import Uploads from './pages/Uploads';
import Login from './pages/Login';
import Register from './pages/Register';
import TopNavigation from './topNavigation';
import SideNavigation from './sideNavigation';
import Footer from './Footer';

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
        <Route path='/login' exact>
          <Login/>
        </Route>

        <Route path='/register' exact>
          <Register/>
        </Route>

        <Route path='/dashboard' exact>
          {this.renderNavWith(DashboardPage)}
        </Route>

        <Route path='/profile' exact>
          {this.renderNavWith(ProfilePage)}
        </Route>

        <Route path='/uploads' exact>
          {this.renderNavWith(Uploads)}
        </Route>
      </Switch>
    );
  };
}

export default Routes;
