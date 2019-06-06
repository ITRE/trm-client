import React from 'react';
import { connect } from "react-redux";

import Ticket from '../partial/ticket.js';

const mapStateToProps = state => ({
  user: state.user,
  tickets: state.tickets
});

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
            staff={ticket.staff}
            thread_id={ticket.thread_id}
            added={ticket.added}
            priority={ticket.priority}
            status={ticket.status}
            kind={ticket.kind}
            subject={ticket.subject}
            info={ticket.info}
            log={ticket.log}
          />)
        }
    </section>
  </section>
)};

export default connect(
  mapStateToProps
)(Dashboard);
