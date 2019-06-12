import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'

import ACTIONS from "./modules/action";
import { connect } from "react-redux";

const mapStateToProps = state => ({
  loggedIn: state.loggedIn,
  user: state.user
})

const User = (props) => {
  const SignupSchema = Yup.object().shape({
    password: Yup.string()
      .required('Please provide your password.')
      .min(8, 'Password must contain 8 characters.')
      .matches(/[A-Z]/, 'Password must contain at least one capital letter.')
      .matches(/[0-9]/, 'Password must contain at least one numeral.')
  })

  function submit(values) {
    console.log('Creating user...')
    if (values) {
      props.newUser(values);
    }
  }

  return (<main className="wrapper">
    {props.loggedIn && <Redirect to={{pathname: '/admin'}}/>}
    <section className="back_holder">
      <button className="link" onClick={()=>{props.history.goBack()}}>Back</button>
    </section>
    <section>
      <h1>New User</h1>
      <p>This is an administrative account. For access to TRM, please request a download from the home page or email us at XXXXXXX </p>
      <Formik
        initialValues={{
          username: '',
          password: '',
          name: '',
          email: '',
          role: 'Shareholder',
          admin: '',
          admingPass: ''
        }}
        validationSchema={SignupSchema}
        onSubmit={values => {
          submit(values)
        }}
      >
        {({ errors, touched }) => (
          <Form className="download">
            <label htmlFor="username">
              Username
            <Field name="username" type="username" />
            </label>

            <label htmlFor="password">
              Password <small>Must contain at least 8 characters, one capital letter, and one number</small>
            <Field name="password" type="password" />
              {errors.password && touched.password ? (
                <span className="error">{errors.password}</span>
              ) : null}
            </label>

            <label htmlFor="name">
              Name
            <Field name="name" type="text" />
            </label>

            <label htmlFor="email">
              Email
            <Field name="email" type="email" />
            </label>

            <label htmlFor="role">
              Role
            <Field name="role" type="text" />
            </label>

            <hr></hr>
            
            <h2>Admin Credentials</h2>
            <p>Creation of a new user requires the approval of an existing administator.</p>

            <label htmlFor="admin">
              Username
            <Field name="admin" type="username" />
            </label>

            <label htmlFor="admingPass">
              Password
            <Field name="admingPass" type="password" />
            </label>


            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </section>
  </main>)
}


export default connect(
  mapStateToProps,
  {newUser: ACTIONS.newUser}
)(User);
