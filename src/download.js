import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from "react-redux"
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import Swal from 'sweetalert2'
import ACTIONS from "./modules/action";

class Download extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      organization: '',
      title: '',
      use: '',
      redirect:false
    }
		this.submit = this.submit.bind(this)
  }

  submit(values) {
    if (values) {
      const ticket= {
        user: values.email,
        staff: '',
        thread_id: '',
        priority: 'Normal',
        status: 'New',
        kind: 'Download',
        info: '',
        subject: 'Request for TRM'
      }
      const kind = {
        name: values.name,
        email: values.email,
        organization: values.organization,
        title: values.title,
        use: values.use
      }
      this.props.requestDownload(ticket, kind).then(res => {
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
      name: Yup.string()
        .required('Please provide the name by which you would like to be addressed.'),
      email: Yup.string()
        .email()
        .required('Please provide the email address where you would like to recieve the files.'),
      organization: Yup.string()
        .min(4, 'This appears too short to be an organization name. If this is an acronym, please write out the full name.')
        .required('Please let us know the name of the organization you represent.'),
      title: Yup.string(),
      use: Yup.string()
        .min(30, 'This description was too short. Please give a bit more detail.')
        .required('Please include a description of how you plan to use this tool for our records.')
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
                <label htmlFor="name">
                  Your Name
                  <Field name="name" />
                  {errors.name && touched.name ? (
                    <span className="error">{errors.name}</span>
                  ) : null}
                </label>

                <label htmlFor="email">
                  Email Address
                  <Field name="email" type="email" />
                  {errors.email && touched.email ? (
                    <span className="error">{errors.email}</span>
                  ) : null}
                </label>

                <label htmlFor="organization">
                  Organization
                  <Field name="organization" />
                  {errors.organization && touched.organization ? (
                    <span className="error">{errors.organization}</span>
                  ) : null}
                </label>

                <label htmlFor="title">
                  Title
                  <Field name="title" />
                  {errors.title && touched.title ? (
                    <span className="error">{errors.title}</span>
                  ) : null}
                </label>

                <label htmlFor="use">
                  How do you plan to use this tool?
                  <Field name="use" component="textarea" />
                  {errors.use && touched.use ? (
                    <span className="error">{errors.use}</span>
                  ) : null}
                </label>

                <button type="submit">Submit</button>
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
  {requestDownload: ACTIONS.requestDownload}
)(Download);
