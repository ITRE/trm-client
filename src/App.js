import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import ACTIONS from "./modules/action";

import logo from './assets/logo.svg';

import Home from './home.js';
import Download from './download.js';
import Login from './login.js';
import Recover from './recover.js';
import Admin from './admin.js';

const mapStateToProps = state => ({
  loggedIn: state.loggedIn
});

const mapDispatchToProps = dispatch => ({
  logOut: () => dispatch(ACTIONS.logOut())
});

const App = (props) => (
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
        <button className="link dark submenu" onClick={props.logOut}>
          Log Out
        </button>
      }
      {!props.loggedIn &&
        <a className="dark" href="/login">
          Login
        </a>
      }
    </header>
    <BrowserRouter>
      <Switch>
        <Route path="/admin" component={Admin} />
        <Route path="/download" component={Download} />
        <Route path="/login/:user/:token" component={Recover} />
        <Route path="/login" component={Login} />
        <Route path="/" component={Home} />
      </Switch>
    </BrowserRouter>
    <footer>
      <p>Copyright Info Stuff</p>
    </footer>
  </div>
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
