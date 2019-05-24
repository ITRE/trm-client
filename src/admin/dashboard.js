import React, { Component } from 'react';
//import moment from 'moment'
//import Swal from 'sweetalert2'
import ACTIONS from "../modules/action";
import { connect } from "react-redux";

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  login: tickets => dispatch(ACTIONS.login(tickets, dispatch))
});

class Dashboard extends Component {
	constructor(props) {
		super(props)
    this.state = {
      inventory: [],
			tickets: [],
			user: {},
			token: '',
			redirect: false
    }

  }

  render() {
    console.log(this.props)
    return (
      <main className="wrapper">
        <section>
          <h1>Welcome {this.props.user && this.props.user.name}</h1>
        </section>
        <section className="Content">
          <div>
            <p>lksdjfjhkjhkljhsk;djfh;asd asd fasd f asd fas df asd f asd f asdfasdfasdfasdfjg fyt d</p>
          </div>
        </section>
      </main>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
