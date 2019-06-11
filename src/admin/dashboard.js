import React from 'react'
import moment from 'moment'
import { connect } from "react-redux"
import ACTIONS from "../modules/action"

import Ticket from '../partial/ticket.js'

const mapStateToProps = state => ({
  user: state.user,
  tickets: state.tickets
});

const Dashboard = (props) => {
  function submit(id) {
    const index = props.tickets.find((ticket) => ticket._id === id)
    if(index) {
      const ticket= {
        _id: index._id,
        user: index.user,
        staff: index.staff,
        thread_id: index.thread_id,
        priority: 'Normal',
        status: 'Completed',
        kind: index.kind,
        info: index.info._id,
        subject: index.subject
      }
      const kind = {
        name: index.info.name,
        email: index.user,
        organization: index.info.organization,
        title: index.info.title,
        use: index.info.use
      }
      const log = {
        type: 'Admin Approval',
        date: moment().format(),
        message_id: '',
        staff: props.user.email,
        note: 'Request approved. Download sent and new user created. Ticket closed.'
      }
      props.approveDownload(ticket, kind, log)
    } else {
      console.log('Couldn\'t get ticket from state.' )
    }
  }

  return (
  <section>
    <header>
      <h1>Welcome {props.user && props.user.name}</h1>
    </header>
    <section className="Content flexible">
        {props.tickets &&
          props.tickets
          .filter(a => {
            return (a.status !== 'Closed' && a.status !== 'Completed')
          })
          .sort((a,b) => {
            const priority = {'Low':4, 'Normal':3, 'Medium':2, 'High':1, 'Urgent':0}
            const status = {'New':0, 'Seen':1, 'In Progress':2, 'On Hold':3, 'Awaiting Reply':4, 'Completed':6, 'Closed':7, 'Reopened':5}
            if (a.priority === b.priority) {
              if (a.status === b.status) {
                console.log('local',a.added.localeCompare(b.added))
                return a.added.localeCompare(b.added)
              } else {
                console.log('status',status[a.status] - status[b.status])
                return status[a.status] - status[b.status]
              }
            } else {
              console.log('priority',priority[a.priority] - priority[b.priority])
              return priority[a.priority] - priority[b.priority]
            }
          })
          .map(ticket => <Ticket
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
            submit={submit}
          />)
        }
    </section>
  </section>
)};

export default connect(
  mapStateToProps,
  {approveDownload: ACTIONS.approveDownload}
)(Dashboard);
