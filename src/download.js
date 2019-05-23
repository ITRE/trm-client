import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios'
import Swal from 'sweetalert2'
import config from './config'

class Download extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      organization: '',
      title: '',
      use: ''
    }
		this.submit = this.submit.bind(this)
  }

  submit(values) {
    axios(`http://${config.api}/messages`, {
      method: "post",
      data: {
        ticket: {
          user: '',
          staff: '',
          thread_id: '',
          priority: 'Normal',
          status: 'New',
          kind: '',
          info: '',
          subject: ''
        },
        kind: {
          name: values.name,
          email: values.email,
          organization: values.organization,
          title: values.title,
          use: values.use
        }
      },
      withCredentials: 'include'
    })
    .then(res => {
      console.log('Login Successful')
      localStorage.setItem('access token', res.data.token)
      this.setState({
        login: <Redirect to={{pathname: '/dashboard'}}/>
      })
    })
    .catch(error => {
      Swal({
        title: error.response.status+' Error',
        type: 'error',
        text:error.response.data.msg,
      })
    })
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

export default Download;
