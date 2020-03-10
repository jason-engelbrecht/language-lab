import React, { Component } from 'react';
import Routes from './components/Routes';
import TopNavigation from './components/topNavigation';
import SideNavigation from './components/sideNavigation';
import Footer from './components/Footer';
import './index.css';
import PreRoutes from './components/PreRoutes';

class App extends Component {
    render() {
      let it = true;

      if(it) {
        return (
          <PreRoutes />
        )
      }
      else {
        return (
          <div className="flexible-content">
            <TopNavigation />
            <div id="sideNav">
              <SideNavigation />
            </div>
            <main id="content" className="p-5">
              <Routes />
            </main>
            <Footer />
          </div>
        );
      }
    }
}

export default App;
