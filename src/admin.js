import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Home from './home.js';
import Dashboard from './admin/dashboard.js';
import ShareDashboard from './share/dashboard.js';
import Edit from './admin/edit.js';
import Account from './admin/account.js';

const mapStateToProps = state => ({
  loggedIn: state.loggedIn,
  user: state.user
});

const Admin = (props) => (
  <main className="wrapper">
    { !props.loggedIn && <Redirect to={{pathname: '/'}}/> }
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/admin/edit" component={Edit} />
        {props.user.role === 'Admin' && <Route exact path="/admin" component={Dashboard} />}
        {props.user.role === 'Shareholder' && <Route exact path="/admin" component={ShareDashboard} />}
        <Route path="/admin" component={Dashboard} />
      </Switch>
    </Router>
  </main>
)

export default connect(
  mapStateToProps
)(Admin);
