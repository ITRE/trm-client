import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'

const Ticket = (props) => {
  function submit() {
    props.submit(props._id)
  }
  function close() {
    props.close(props._id)
  }

  return (
    <div className={props.status + ' ticket'}>
      <header className={props.priority}>
        <h3>{props.subject}</h3>
        <p><strong>Opened: </strong>{moment(props.added).format('MMMM Do YYYY, h:mm a')}</p>
      </header>
      <section>
        <p><strong>User: </strong>{props.user}</p>
        <p><strong>Staff: </strong>{props.staff ? props.staff : 'Not Assigned'}</p>
        <p><strong>Kind: </strong>{props.kind}</p>
        {props.info.desc && <p><strong>Description: </strong>{props.info.desc}</p>}
          <Link
            className="button"
            to={{
              pathname: "/admin/edit",
              state: { ticket: {
                _id: props._id,
                user: props.user,
                staff: props.staff,
                thread_id: props.thread_id,
                added: props.added,
                priority: props.priority,
                status: props.status,
                kind: props.kind,
                subject: props.subject,
                info: props.info,
                log: props.log
              } }
            }}
          >Edit </Link>
        <button className="button cancel" onClick={close}>Close</button>
        {props.kind === 'Download' &&
          <button className="button" onClick={submit}>Approve</button>
        }
      </section>
    </div>
  )
}

export default Ticket
