import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { connect } from "react-redux"
import ACTIONS from "../modules/action"

const mapStateToProps = state => ({
  user: state.user
})

class Account extends Component {
  constructor(props) {
    super(props);

    this.state = {
      confirm: '',
      password: ''
    }
  }

  render() {
    const SignupSchema = Yup.object().shape({
      password: Yup.string()
        .required('Please provide your password.')
        .min(8, 'Password must contain 8 characters.')
        .matches(/[A-Z]/, 'Password must contain at least one capital letter.')
        .matches(/[0-9]/, 'Password must contain at least one numeral.'),
      confirm: Yup.string()
        .required('Password confirm is required')
        .oneOf([Yup.ref('password')], 'Passwords do not match')
    });
  //  console.log(this.props)
    return (
      <main className="wrapper">
        <section className="back_holder">
          <button className="link" onClick={()=>{this.props.history.goBack()}}>Back</button>
        </section>
        <section>
          <h1>Recover</h1>
          <Formik
            initialValues={this.state}
            validationSchema={SignupSchema}
            onSubmit={values => {
              console.log(values);
              this.recover(values);
            }}
          >
            {({ errors, touched }) => (
              <Form className="download" onSubmit={this.recover}>
                <label htmlFor="password">
                  Password <span className="small">Must contain at least 8 characters, one capital letter, and one number</span>
                <Field name="password" type="password" />
                  {errors.password && touched.password ? (
                    <span className="error">{errors.password}</span>
                  ) : null}
                </label>
                <label htmlFor="confirm">
                  Confirm Password
                <Field name="confirm" type="password" />
                  {errors.confirm && touched.confirm ? (
                    <span className="error">{errors.confirm}</span>
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
  mapStateToProps,
  {}
)(Account);
