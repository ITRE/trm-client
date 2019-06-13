import React from 'react'
import moment from 'moment'
import { connect } from "react-redux"
import ACTIONS from "../modules/action"
import Swal from 'sweetalert2'

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

  function close(id) {
    let ticket = props.tickets.find((ticket) => ticket._id === id)
    ticket.status= "Closed"
    let log = {
      type: 'Admin Close',
      date: moment().format(),
      message_id: '',
      staff: props.user.email,
      note: 'Ticket was marked closed.'
    }
    const email = false
    props.sendEmail(ticket, log, email, props.history).then(res => {
      Swal.fire({
        title: 'Closed',
        type: 'success',
        text: 'This ticket has been marked as Closed.',
      }).then(res=>{

      }).catch(err=>console.log(err))
    })
  }

  function version() {
    Swal.fire({
      title: 'Select File',
      showCancelButton: true,
      buttonsStyling: false,
      confirmButtonText: 'Upload',
      html:
          '<label>File Name<input type="text" id="upload-name"></label>' +
          '<label>Version<input type="text" id="upload-version"></label>' +
          '<label>Google Share Link<input type="text" id="upload-share"></label>' +
          '<label class="swal_check"><input type="checkbox" id="upload-email">Email New Version to Users?</label>',
      preConfirm: () => {
        let share = document.getElementById('upload-share').value.match(/[-\w]{25,}/)
        let name = document.getElementById('upload-name').value
        let version = document.getElementById('upload-version').value
        if(!share) {
          Swal.showValidationMessage('Share link was not recognized.')
        } else if(!name) {
          Swal.showValidationMessage('Please provide a file name.')
        } else if(!version) {
          Swal.showValidationMessage('Please indicate the version number.')
        } else {
          return [{
            name: name,
            version: version,
            fileID: share[0]
          }, document.getElementById('upload-email').checked]
        }
      }
    }).then(upload => {
      if (upload.dismiss) {
        return
      }
      props.updateDownload(upload[0], upload[1])
    }).then(res=>{

    }).catch(err=>console.log(err))
  }

  return (
  <section>
    <header>
      <h1>Welcome {props.user && props.user.name}</h1>
      <button onClick={version}>Upload New Version</button>
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
                return a.added.localeCompare(b.added)
              } else {
                return status[a.status] - status[b.status]
              }
            } else {
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
            close={close}
          />)
        }
    </section>
  </section>
)};

export default connect(
  mapStateToProps,
  {
    approveDownload: ACTIONS.approveDownload,
    sendEmail: ACTIONS.sendEmail,
    updateDownload: ACTIONS.updateDownload
  }
)(Dashboard);
