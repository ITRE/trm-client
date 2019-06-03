import React, { Component } from 'react';
//import moment from 'moment'
//import Swal from 'sweetalert2'
import ACTIONS from "../modules/action";
import { connect } from "react-redux";

import Ticket from '../partial/ticket.js';

const mapStateToProps = state => ({
  user: state.user,
  tickets: state.tickets
});

const mapDispatchToProps = dispatch => ({
  login: tickets => dispatch(ACTIONS.login(tickets, dispatch))
});

/*
added: "2019-05-24T18:07:14.118Z"
info: {_id: "5ce832d2fa38a5001743631c", __v: 0}
kind: "Download"
log: []
priority: "Normal"
staff: ""
status: "New"
subject: "Request for TRM"
thread_id: "16aeb06848f04dff"
user: "p.peabody@fake.com"
__v: 0
_id: "5ce832d2fa38a5001743631d"
*/
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
      <section>
        <header>
          <h1>Welcome {this.props.user && this.props.user.name}</h1>
        </header>
        <section className="Content">
            {this.props.tickets &&
              this.props.tickets.map(ticket => <Ticket
                key={ticket._id}
                priority={ticket.priority}
                added={ticket.added}
                kind={ticket.kind}
                staff={ticket.staff}
                status={ticket.status}
                subject={ticket.subject}
                threadId={ticket.thread_id}
                user={ticket.user}
                log={ticket.log}
                info={ticket.info._id}
              />)
            }
        </section>
      </section>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
