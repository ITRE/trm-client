import React from 'react';
import { Redirect } from 'react-router-dom'

import { connect } from "react-redux";
import ACTIONS from "./modules/action";
import UserForm from "./partial/userForm";

const mapStateToProps = state => ({
  loggedIn: state.loggedIn,
  user: state.user
})

const User = (props) => {

  return (<main className="wrapper">
    {props.loggedIn && <Redirect to={{pathname: '/admin'}}/>}
    <section className="back_holder">
      <button className="link" onClick={()=>{props.history.goBack()}}>Back</button>
    </section>
    <section>
      <h1>New User</h1>
      <p>This is an administrative account. For access to TRM, please request a download from the home page or email us at XXXXXXX </p>
      <UserForm submit={props.newUser}/>
    </section>
  </main>)
}


export default connect(
  mapStateToProps,
  {newUser: ACTIONS.newUser}
)(User);
