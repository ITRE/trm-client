import React from 'react'
import moment from 'moment'
import { connect } from "react-redux"
import ACTIONS from "../modules/action"
import { Redirect } from 'react-router-dom'
import Swal from 'sweetalert2'

import Ticket from '../partial/ticket.js'

const mapStateToProps = state => ({
  user: state.user,
  tickets: state.tickets
});

const ShareDashboard = (props) => {
  return (
  <section>
    <header>
      <h1>Welcome {props.user && props.user.name}</h1>
    </header>
    <section className="Content flexible">
        {props.tickets &&
          props.tickets
          .sort((a,b) => {
            const priority = {'Low':4, 'Normal':3, 'Medium':2, 'High':1, 'Urgent':0}
            const status = {'New':0, 'Seen':1, 'In Progress':2, 'On Hold':3, 'Awaiting Reply':4, 'Completed':6, 'Closed':7, 'Reopened':5}
            if (a.priority === b.priority) {
              if (a.status === b.status) {
                return a.added.localeCompare(b.added)
              } else {
                return status[a.status] - status[b.status]
              }
            } else {
              return priority[a.priority] - priority[b.priority]
            }
          })
          .map(ticket => <div key={ticket._id} className="share ticket">
            <p><strong>{ticket.subject}  |  {ticket.status}</strong></p>
            <p><strong>Opened: </strong>{moment(props.added).format('MMMM Do YYYY, h:mm a')}</p>
          </div>)
        }
    </section>
  </section>
)};

export default connect(
  mapStateToProps,
  {}
)(ShareDashboard);
