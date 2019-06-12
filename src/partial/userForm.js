import React from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'

const UserForm = (props) => {

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

  console.log(props)

  return (
    <div>
    <Formik
      initialValues={{
        username: '',
        password: '',
        confirm: '',
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

          {props.account && <section className="formHeader">
            <h2>Change Password</h2>
            <label htmlFor="password">
              New Password
              <Field name="password" type="password" />
            </label>

            <label htmlFor="confirm">
              Confirm Password
              <Field name="confirm" type="password" />
            </label>
          </section>}

          <h2>User Information</h2>

          <label htmlFor="username">
            Username
          <Field name="username" type="username" />
          </label>

          {props.new && <label htmlFor="password">
            Password <small>Must contain at least 8 characters, one capital letter, and one number</small>
            <Field name="password" type="password" />
            {errors.password && touched.password ? (
              <span className="error">{errors.password}</span>
            ) : null}
          </label>}

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
            <Field name="role" component="select">
              <option value="Admin">Admin</option>
              <option value="Shareholder">Shareholder</option>
            </Field>
          </label>

          {props.new && <section className="formFooter">
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
          </section>}

          <button type="submit">Submit</button>
          <button className="cancel" onClick={()=>{props.history.goBack()}}>Cancel</button>
        </Form>
      )}
    </Formik>
    </div>
  )
}

export default UserForm
