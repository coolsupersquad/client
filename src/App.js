import React, { useState, useEffect } from 'react'
import Home from './pages/Home'
import Create from './pages/Create'
import Near from './pages/Near'
import Account from './pages/Account'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'

import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import FolderIcon from '@material-ui/icons/Folder'
import RestoreIcon from '@material-ui/icons/Restore'
import FavoriteIcon from '@material-ui/icons/Favorite'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import AddIcon from '@material-ui/icons/Add'

import logo from './logo.svg'
import './App.css'
import './assets/style/locations.css'
import { BrowserRouter as Router } from 'react-router-dom'
import { Route, HashRouter, Link, Redirect, Switch } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { db, firebaseAuth } from './config/constants'

function PrivateR({ component: Component, authed, ...rest }) {
  console.log('Checking user', window.user)
  return (
    <Route
      {...rest}
      render={(props) =>
        window.user ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/account', state: { from: props.location } }}
          />
        )
      }
    />
  )
}

function PublicR({ component: Component, authed, ...rest }) {
  return <Route {...rest} render={(props) => <Component {...props} />} />
}

function App() {
  let current = 'NAV_' + window.location.pathname.substring(1)
  const [value, setValue] = useState(current)
  const [authed, setAuthed] = useState(null)
  const history = useHistory()

  function handleChange(e, newValue) {
    setValue(newValue)
  }

  useEffect(() => {
    current = 'NAV_' + window.location.pathname.substring(1)
    setValue(current)

    const removeListener = firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        setAuthed(user)
        window.user = user
        console.log(user)
      } else {
        setAuthed(null)
        window.user = null
        console.log('Not authed !')
      }
    })
  }, [window.location.pathname])

  return (
    <Router>
      <div>
        {/* https://github.com/guilherme6191/react-router-firebase-auth-material-ui */}
        {/* https://github.com/cruip/open-react-template */}

        <BottomNavigation
          value={value}
          onChange={handleChange}
          className='bottomNav'
        >
          <BottomNavigationAction
            component={Link}
            to='/'
            label='Recents'
            value='NAV_'
            icon={<RestoreIcon />}
          />
          <BottomNavigationAction
            component={Link}
            to='/near'
            label='Nearby'
            value='NAV_near'
            icon={<LocationOnIcon />}
          />
          <BottomNavigationAction
            component={Link}
            to='/create'
            label='Create'
            value='NAV_create'
            icon={<AddIcon />}
          />
          <BottomNavigationAction
            component={Link}
            to='/account'
            label='Account'
            value='NAV_account'
            icon={<FavoriteIcon />}
          />
        </BottomNavigation>

        <div className='row'>
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/account' component={Account} />

            <PrivateR authed={authed} path='/create' component={Create} />
            <PublicR authed={authed} path='/near' component={Near} />
            {/* <PrivateR
                    authed={authed}
                    path="/dashboard"
                    component={Dashboard}
                  /> */}
            <Route render={() => <h3>404</h3>} />
          </Switch>
        </div>

        {/* <div className="container d-flex justify-content-center mt-3">
           
          </div> */}
      </div>
    </Router>
  )
}

export default App
