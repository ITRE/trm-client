import React from 'react';
import { connect } from "react-redux";

import Ticket from '../partial/ticket.js';

const mapStateToProps = state => ({
  user: state.user,
  tickets: state.tickets
});
/*
user: String,
  staff: String,
  thread_id: {
    type: String,
    unique: true
  },
  added: {
    type: Date,
    default: Date.now
  },
  priority: {
    type: String,
    default: 'Normal',
		enum: ['Low', 'Normal', 'Medium', 'High', 'Urgent']
  },
  status: {
    type: String,
    default: 'New',
		enum: ['New', 'Seen', 'In Progress', 'On Hold', 'Awaiting Reply', 'Completed', 'Closed', 'Reopened']
  },
  kind: {
		type: String,
		enum: ['Download', 'Other']
	},
  subject: String,
  info: {type: Schema.Types.ObjectId, refPath: 'kind'},
  log: [NoteSchema]
  */

const Dashboard = (props) => {console.log(props);return(
  <section>
    <header>
      <h1>Welcome {props.user && props.user.name}</h1>
    </header>
    <section className="Content flexible">
        {props.tickets &&
          props.tickets.map(ticket => <Ticket
            key={ticket._id}
            _id={ticket._id}
            user={ticket.user}
            added={ticket.added}
            priority={ticket.priority}
            status={ticket.status}
            kind={ticket.kind}
            subject={ticket.subject}
            info={ticket.info._id}
            log={ticket.log}
            staff={ticket.staff}
            thread_id={ticket.thread_id}
          />)
        }
    </section>
  </section>
)};

export default connect(
  mapStateToProps
)(Dashboard);
