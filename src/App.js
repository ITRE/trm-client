import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import logo from './assets/logo.svg';

import Home from './home.js';
import Download from './download.js';
import Login from './login.js';
import Recover from './recover.js';
import Dashboard from './admin/dashboard.js';

class App extends Component {
  render() {
    return (
      <div className="app">
        <header className="header">
          <a className="logo" href="/">
            <img src={logo} alt="Spinning Logo" />
          </a>
          <a className="dark" href="/login">
            Login
          </a>
        </header>
        <BrowserRouter>
          <Switch>
            <Route path="/dashboard" component={Dashboard} />
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
    );
  }
}

export default App;
