import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import Swal from 'sweetalert2'
import config from './config'
import ACTIONS from "./modules/action";
import { connect } from "react-redux";

const mapStateToProps = state => ({
  loggedIn: state.loggedIn,
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  login: credentials => dispatch(ACTIONS.login(credentials))
});

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    }
		this.recover = this.recover.bind(this)
		this.submit = this.submit.bind(this)
		this.change = this.change.bind(this)
  }

  submit(values) {
    console.log('Loging in...')
    if (values) {
      this.props.login(values);
    }
  }

	change(event) {
		this.setState({[event.target.name]: event.target.value})
	}

  recover() {
    Swal.fire({
      title: 'Provide Your Email Address',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Look up',
      showLoaderOnConfirm: true,
      preConfirm: (login) => {
        axios.get(`http://${config.api}/login`, {
    			user: login
    		})
        .then(response => {
          if (!response.ok) {
            throw new Error(response.statusText)
          }
          return response.json()
        })
        .catch(error => {
          Swal.showValidationMessage(
            `Request failed: ${error}`
          )
        })
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.value) {
        Swal.fire({
          title: `value`,
          html: result.value
        })
      }
    })
  }

  render() {
    const SignupSchema = Yup.object().shape({
      username: Yup.string()
        .required('Please enter your username.'),
      password: Yup.string()
        .required('Please provide your password.')
        .matches(/[A-Z]/, 'Password must contain at least one capital letter.')
        .matches(/[0-9]/, 'Password must contain at least one numeral.')
        .min(8, 'Password must contain 8 characters.')
    });
  //  console.log(this.props)
    return (
      <main className="wrapper">
        {this.props.loggedIn && <Redirect to={{pathname: '/admin'}}/>}
        <section className="back_holder">
          <button className="link" onClick={()=>{this.props.history.goBack()}}>Back</button>
        </section>
        <section>
          <h1>Login</h1>
          <Formik
            initialValues={this.state}
            validationSchema={SignupSchema}
            onSubmit={values => {
              this.submit(values);
            }}
          >
            {({ errors, touched }) => (
              <Form className="download">

                <label htmlFor="first">
                  Username
                  <Field name="username" type="username" />
                  {errors.username && touched.username ? (
                    <span className="error">{errors.username}</span>
                  ) : null}
                </label>

                <label htmlFor="password">
                  Password <small>Must contain at least 8 characters, one capital letter, and one number</small>
                <Field name="password" type="password" />
                  {errors.password && touched.password ? (
                    <span className="error">{errors.password}</span>
                  ) : null}
                </label>

                <button type="submit">Submit</button>
                <a className="button cancel" type="button" href="/user">New User</a>
              </Form>
            )}
          </Formik>
          <button className="link" onClick={this.recover}>Forgot Password</button>
        </section>
        <p>{this.props.user && this.props.user.name}</p>
      </main>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
