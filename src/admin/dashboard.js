import React, { Component } from 'react';
import moment from 'moment'
import Swal from 'sweetalert2'
const jwt = require('jsonwebtoken')

class Dashboard extends Component {
	constructor(props) {
		super(props)
    this.state = {
      inventory: [],
			tickets: [],
			user: {},
			token: '',
			redirect: false
    }

		this.logout = this.logout.bind(this);
  }
  componentDidMount() {
    const tempToken = localStorage.getItem('access token');
		if (tempToken) {
			const tempUser = jwt.decode(tempToken)
			if (moment.unix(tempUser.exp).isAfter(Date.now())) {
				this.setState({
					token: tempToken,
					user: tempUser
				})
			} else {
				Swal({
				  title: 'Token Expired',
				  type: 'warning',
				  text:'Your login session has expired. Redirecting you to the login page.',
				})
				this.logout()
			}
		}
  }

	logout() {
		localStorage.removeItem('access token')
		this.setState({token: null, user: null})
	}

  render() {
    console.log(this.state)
    return (
      <main className="wrapper">
        <section>
          <h1>Welcome {this.state.user.name}</h1>
        </section>
        <section className="Content">
          <div>
            <p>lksdjfjhkjhkljhsk;djfh;asd asd fasd f asd fas df asd f asd f asdfasdfasdfasdfjg fyt d</p>
          </div>
        </section>
      </main>
    );
  }
}

export default Dashboard;
