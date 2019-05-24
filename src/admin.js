import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import ACTIONS from "./modules/action";

import logo from './assets/logo.svg';

import Home from './home.js';
import Dashboard from './admin/dashboard.js';
import Test from './admin/test.js';

const mapStateToProps = state => ({
  loggedIn: state.loggedIn
});

const mapDispatchToProps = dispatch => ({
  logOut: () => dispatch(ACTIONS.logOut())
});

const Admin = (props) => (
  <div>

  { !props.loggedIn && <Redirect to={{pathname: '/'}}/> }
    <BrowserRouter>
      <Switch>
        <Route path="/admin/test" component={Test} />
        <Route path="/admin" component={Dashboard} />
        <Route path="/" component={Home} />
      </Switch>
    </BrowserRouter>
  </div>
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Admin);
