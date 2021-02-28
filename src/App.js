import React, { useState, useEffect } from 'react';
import Home from "./pages/Home";
import Search from "./pages/Search";
import Near from "./pages/Near";
import Account from "./pages/Account";
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FolderIcon from '@material-ui/icons/Folder';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';

import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router } from 'react-router-dom'
import { Route, HashRouter, Link, Redirect, Switch } from 'react-router-dom';

function PrivateR({ component: Component, authed, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        authed === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/', state: { from: props.location } }}
          />
        )}
    />
  );
}

function PublicR({ component: Component, authed, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        authed === false ? (
          <Component {...props} />
        ) : (
          <Redirect to="/search" />
        )}
    />
  );
}

function App() {
  let authed = true;
  let current = "NAV_" + window.location.pathname.substring(1);
  const [value, setValue] = useState(current) 

  function handleChange(e, newValue) {
    setValue(newValue)
  }

  return (
    <Router>
      <div>
          

          {/* https://github.com/guilherme6191/react-router-firebase-auth-material-ui */}
          {/* https://github.com/cruip/open-react-template */}

          <BottomNavigation value={value} onChange={handleChange} className="bottomNav">
            <BottomNavigationAction component={Link} to="/" label="Recents" value="NAV_" icon={<RestoreIcon />} />
            <BottomNavigationAction component={Link} to="/near" label="Nearby" value="NAV_nearby" icon={<LocationOnIcon />} />
            <BottomNavigationAction component={Link} to="/search" label="Folder" value="NAV_search" icon={<FolderIcon />} />
            <BottomNavigationAction component={Link} to="/account" label="Account" value="NAV_account" icon={<FavoriteIcon />} />
          </BottomNavigation>

          <div className="container d-flex justify-content-center mt-3">
            <div className="row">
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/account" component={Account} />

                <PrivateR
                  authed={authed}
                  path="/search"
                  component={Search}
                />
                <PrivateR
                  authed={authed}
                  path="/near"
                  component={Near}
                />
                {/* <PrivateR
                  authed={authed}
                  path="/dashboard"
                  component={Dashboard}
                /> */}
                <Route render={() => <h3>404</h3>} />
              </Switch>
            </div>
          </div>
        </div>

    </Router>
  );
}

export default App;
