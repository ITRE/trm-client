import React from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { connect } from "react-redux"
import ACTIONS from "./modules/action"
//import Swal from 'sweetalert2'

import logo from './assets/logo.svg'

import Home from './home.js'
import Download from './download.js'
import Login from './login.js'
import User from './user.js'
import Recover from './recover.js'
import Admin from './admin.js'

import Loader from './partial/loader.js'
import Error from './partial/error.js'

const mapStateToProps = state => ({
  loggedIn: state.loggedIn,
  error: state.error,
  user: state.user,
  isFetching: state.isFetching

});

const mapDispatchToProps = dispatch => ({
  logOut: () => dispatch(ACTIONS.logOut())
});

const App = (props) => {console.log(props); return(
  <div className="app">
    <header className="header">

      {props.loggedIn &&
        <a className="logo" href="/dashboard">
          <img src={logo} alt="Spinning Logo" />
        </a>
      }
      {!props.loggedIn &&
        <a className="logo" href="/">
          <img src={logo} alt="Spinning Logo" />
        </a>
      }

      {props.loggedIn &&
        <nav className="account">
          {props.user.name}
          <div className="submenu">
            <a href="/admin/account">
              Account
            </a>
            <button className="link dark" onClick={props.logOut}>
              Log Out
            </button>
          </div>
        </nav>
      }
      {!props.loggedIn &&
        <a className="dark" href="/login">
          Login
        </a>
      }
    </header>
    {props.error && <Error errorTitle="Error" errorMessage={props.error} />}
    {props.isFetching && <Loader />}
    <Router>
      <Switch>
        <Route path="/admin" component={Admin} />
        <Route path="/download" component={Download} />
        <Route path="/login/:user/:token" component={Recover} />
        <Route path="/user" component={User} />
        <Route path="/login" component={Login} />
        <Route path="/" component={Home} />
      </Switch>
    </Router>
    <footer>
      <p>Copyright Info Stuff</p>
    </footer>
  </div>
)}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
