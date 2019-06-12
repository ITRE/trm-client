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

  return (
    <div>
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
            <Field name="role" component="select">
              <option value="Admin">Admin</option>
              <option value="Shareholder">Shareholder</option>
            </Field>
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
    </div>
  )
}

export default UserForm
