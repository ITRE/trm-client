import React from 'react';
import moment from 'moment'
import { Link } from 'react-router-dom'

const Ticket = (props) => (
  <div className={props.status + ' ticket'}>
    <header className={props.priority}>
      <h3>{props.subject}</h3>
      <p><strong>Opened: </strong>{moment(props.added).format('MMMM Do YYYY, h:mm a')}</p>
    </header>
    <section>
      <p><strong>User: </strong>{props.user}</p>
      <p><strong>Staff: </strong>{props.staff ? props.staff : 'Not Assigned'}</p>
      <p><strong>Kind: </strong>{props.kind}</p>
        <Link
          className="button"
          to={{
            pathname: "/admin/edit",
            state: { ticket: props }
          }}
        >Edit </Link>
        <Link
          className="button cancel"
          to={{
            pathname: "/admin/close",
            state: { ticket: props }
          }}
        >Close </Link>
    </section>
  </div>
)

export default Ticket
