import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
//import Swal from 'sweetalert2'
import config from './config'

class Recover extends Component {
  constructor(props) {
    super(props);

    this.state = {
      confirm: '',
      password: ''
    }
		this.recover = this.recover.bind(this)
  }

  recover(event, values) {
    event.preventDefault()
    console.log(values)
    axios.put(`http://${config.api}/login`, {
			email: this.props.match.params.user,
      password: values.password,
      token: this.props.match.params.token
		})
    .then(res => {
			alert('success!')
			this.setState({
				login: <Redirect to={{pathname: '/login'}}/>
      })
    })
		.catch(error => {
	    alert(error)
	  })
    return;
  }

  render() {
    console.log(this.props.match.params)
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
      <main className="content">
        <section className="back_holder">
          <button className="back" onClick={()=>{this.props.history.goBack()}}>Back</button>
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

export default Recover;
