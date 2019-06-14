import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from "react-redux"
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import Swal from 'sweetalert2'
import ACTIONS from "./modules/action";

class Help extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Email: '',
      subject: '',
      desc: '',
      redirect:false
    }
		this.submit = this.submit.bind(this)
  }

  submit(values) {
    if (values) {
      const ticket= {
        email: values.Email,
        subject: values.subject,
        desc: values.desc
      }
      this.props.requestHelp(ticket).then(res => {
        Swal.fire({
          title: 'Submitted!',
          type: 'success',
          text: 'Your request has been submitted! We\'ll contact you as soon as we are able.',
        }).then(res=>{
          if(res) {
            this.setState({
              redirect: <Redirect to={{pathname: '/'}}/>
            })
          }
        })
      }).catch(err=>console.log(err))
    }
  }

  render() {
    const SignupSchema = Yup.object().shape({
      Email: Yup.string()
        .email()
        .required('Please provide the email address where you would like to recieve the files.'),
      subject: Yup.string()
        .required('Please provide a subject line for this request'),
      desc: Yup.string()
        .min(30, 'This description was too short. Please give a bit more detail.')
        .required('Please include a description of your issue.')
    });

    return (
      <main className="wrapper">
        {this.state.redirect}
        <section className="backArrow">
          <a href="/"> Back </a>
        </section>
        <section>
          <h1>Download</h1>
          <Formik
            initialValues={this.state}
            validationSchema={SignupSchema}
            onSubmit={values => {
              this.submit(values);
            }}
          >
            {({ errors, touched }) => (
              <Form className="download">
                <label htmlFor="Email">
                  Email Address
                  <Field name="Email" type="email" />
                  {errors.Email && touched.Email ? (
                    <span className="error">{errors.Email}</span>
                  ) : null}
                </label>

                <label htmlFor="subject">
                  Subject
                  <Field name="subject" />
                  {errors.subject && touched.subject ? (
                    <span className="error">{errors.subject}</span>
                  ) : null}
                </label>

                <label htmlFor="desc">
                  Description of the Issue
                  <Field name="desc" component="textarea" />
                  {errors.desc && touched.desc ? (
                    <span className="error">{errors.desc}</span>
                  ) : null}
                </label>

                <button type="submit">Submit</button>
                <button className="cancel" type="button" onClick={() => this.props.history.goBack()}>Cancel</button>
              </Form>
            )}
          </Formik>
        </section>
      </main>
    );
  }
}

export default connect(
  null,
  {requestHelp: ACTIONS.requestHelp}
)(Help);
