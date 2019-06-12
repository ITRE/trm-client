import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from "react-redux"

import ACTIONS from "../modules/action"
import UserForm from "../partial/userForm"

const mapStateToProps = state => ({
  user: state.user
})

class Account extends Component {
  constructor(props) {
    super(props);

    this.state = {
      confirm: '',
      password: ''
    }
  }

  render() {
    return (
      <main className="wrapper">
        <section className="back_holder">
          <button className="link" onClick={()=>{this.props.history.goBack()}}>Back</button>
        </section>
        <section>
          <h1>Recover</h1>
          <UserForm account={true} history={this.props.history} />
        </section>
      </main>
    );
  }
}

export default connect(
  mapStateToProps,
  {}
)(Account);
