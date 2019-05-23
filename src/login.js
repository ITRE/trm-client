import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import Swal from 'sweetalert2'
import config from './config'

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      login: false
    }
		this.recover = this.recover.bind(this)
		this.submit = this.submit.bind(this)
		this.change = this.change.bind(this)
  }

  componentDidMount(prevProps) {
    console.log(this.props.location, 'vs', prevProps)
  }

  submit(values) {
    console.log('Loging in...')
    console.log(values)
    axios(`http://${config.api}/login`, {
      method: "post",
      data: {username: values.username, password: values.password},
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
        axios.get(`http://localhost:8000/login`, {
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
      //  this.setState({
  		//		login: <Redirect to={{pathname: '/login'}}/>
  		//	})
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
        {this.state.login && this.state.login}
        <section className="back_holder">
          <button className="back" onClick={()=>{this.props.history.goBack()}}>Back</button>
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
                  Password <span className="small">Must contain at least 8 characters, one capital letter, and one number</span>
                <Field name="password" type="password" />
                  {errors.password && touched.password ? (
                    <span className="error">{errors.password}</span>
                  ) : null}
                </label>

                <button type="submit">Submit</button>
                <button className="cancel" type="button" onClick={this.recover}>Forgot Password</button>
              </Form>
            )}
          </Formik>
        </section>
      </main>
    );
  }
}

export default Login;
