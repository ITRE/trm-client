import React, { Component } from 'react';
import ACTIONS from "../modules/action";
import { Formik, Form, Field } from 'formik';
import { connect } from "react-redux";
import { Link, Redirect } from 'react-router-dom'
import moment from 'moment'
import Swal from 'sweetalert2'

import Log from '../partial/log.js';
//import Popup from '../partial/popup.js';

const mapStateToProps = state => ({
  user: state.user,
  tickets: state.tickets
});


class Edit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ticket: {},
      note:'',
      redirect:false,
      test:false
    }
		this.submit = this.submit.bind(this)
  }
  test() {

  }

  componentDidMount() {
    console.log(this.props.location.state.ticket)
    this.setState({...this.state,
      ticket: this.props.location.state.ticket
    })
  }

  submit(values) {
    const ticket = {...this.state.ticket,
      priority: values.priority,
      status: values.status,
      thread_id: values.thread_id,
      subject: values.subject,
    }
    let log, email
    if (values.note) {
      log = {
        type: 'Admin Response',
        date: moment().format(),
        message_id: '',
        staff: this.props.user.email,
        note: values.note
      }
      email = true
    } else {
      log = {
        type: 'Admin Edit',
        date: moment().format(),
        message_id: '',
        staff: this.props.user.email,
        note: 'No Email Sent'
      }
      email = false
    }
    this.props.sendEmail(ticket, log, email, this.props.history).then(res => {
      Swal.fire({
        title: 'Submitted!',
        type: 'success',
        text: 'Your edit has been saved.',
      }).then(res=>{
        if(res) {
          this.setState({
            redirect: <Redirect to={{pathname: '/admin'}}/>
          })
        }
      })
    })
  }

  render() {
    console.log(this.props)
    return (
      <section>
        {this.state.redirect}
      <Formik
        initialValues={{
          priority: this.props.location.state.ticket.priority,
          status: this.props.location.state.ticket.status,
          user: this.props.location.state.ticket.user,
          thread_id: this.props.location.state.ticket.thread_id,
          subject: this.props.location.state.ticket.subject,
        }}
        onSubmit={values => {
          this.submit(values);
        }}
      >
        {({ errors, touched }) => (
          <Form className="download">
            <header>
              <h1>Edit {this.state.ticket.thread_id}</h1>
              <p><strong>Opened: </strong>{moment(this.state.ticket.added).format('MMMM Do YYYY, h:mm a')}</p>
            </header>
            <section className="flexible">
              <label htmlFor="priority">
                Priority
                <Field name="priority" component="select">
                  <option value="Low">Low</option>
                  <option value="Normal">Normal</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Urgent">Urgent</option>
                </Field>
              </label>
              <label htmlFor="status">
                Status
                <Field name="status" component="select">
                  <option value="New">New</option>
                  <option value="Seen">Seen</option>
                  <option value="In Progress">In Progress</option>
                  <option value="On Hold">On Hold</option>
                  <option value="Awaiting Reply">Awaiting Reply</option>
                  <option value="Completed">Completed</option>
                  <option value="Closed">Closed</option>
                  <option value="Reopened">Reopened</option>
                </Field>
              </label>
            </section>
            <section className="email">

              {this.state.ticket.info && <p><strong>Description: </strong>{this.state.ticket.info.desc}</p>}

              {this.state.ticket.log && this.state.ticket.log.map(entry => <Log
                key={entry._id}
                date={moment(entry.date).format('MMMM Do YYYY, h:mm a')}
                type ={entry.type}
                staff={entry.staff}
                message={entry.note}
              />)}

              <label htmlFor="user">
                To:
                <Field name="user" disabled="disabled" />
              </label>
              <label htmlFor="subject">
                Subject:
                <Field name="subject" disabled="disabled" />
              </label>
              <label htmlFor="note">
                Body:
                <Field name="note" component="textarea" />
              </label>
            </section>

            <button type="submit">Submit</button>
              <Link
                className="button cancel"
                to="/admin/"
              >Cancel</Link>
          </Form>
        )}
      </Formik>

      </section>
    )
  }
}

export default connect(
  mapStateToProps,
  {sendEmail: ACTIONS.sendEmail}
)(Edit);
