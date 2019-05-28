import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Home from './home.js';
import Dashboard from './admin/dashboard.js';
import Test from './admin/test.js';

const mapStateToProps = state => ({
  loggedIn: state.loggedIn
});

const Admin = (props) => (
  <main className="wrapper">
    { !props.loggedIn && <Redirect to={{pathname: '/'}}/> }
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/admin/test" component={Test} />
        <Route path="/admin" component={Dashboard} />
      </Switch>
    </BrowserRouter>
  </main>
)

export default connect(
  mapStateToProps
)(Admin);
