import React from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import Swal from 'sweetalert2'

const UserForm = (props) => (
  <div>
  <Formik
    initialValues={props.initial}
    onSubmit={values => {
      console.log('clicked')
      if (values !== props.initial) {
        if (props.account && !values.password) {
          Swal.fire({
            title: 'Enter your password to confirm changes',
            input: 'password',
            showCancelButton: true,
            inputValidator: (input) => {
              if (!input) {
                return 'A password is required to change account info'
              } else {
                values.password = input
              }
            }
          }).then((result)=>{
            if(!result.dismiss) {
              props.send(values)
            }
          })
        } else {
          props.send(values)
        }
      } else {
        props.history.goBack()
      }
    }}
  >
    {({ values, errors, touched }) => (
      <Form id="user" className="download">

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
        <Field name="username" type="username" disabled="{props.account ? true : false}"/>
        </label>

        {props.new && <label htmlFor="password">
          Password <small>Must contain at least 8 characters, one capital letter, and one number</small>
          <Field name="password" type="password" />
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
          <Field name="role" component="select" disabled="{props.initial.role === 'Admin' ? false : true}">
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

        <button type="submit" form="user">Submit</button>
        <button className="cancel" type="button" onClick={() => props.history.goBack()}>Cancel</button>
      </Form>
    )}
  </Formik>
  </div>
)

export default UserForm
