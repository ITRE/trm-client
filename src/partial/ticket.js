import React from 'react';
import moment from 'moment'
import { Link } from 'react-router-dom'

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
      <button>Edit</button>
        <Link
          className="button"
          to={{
            pathname: "/admin/edit",
            state: { ticket: props }
          }}
        >Edit </Link>
      <button className="cancel">Close</button>
    </section>
  </div>
)

export default Ticket
