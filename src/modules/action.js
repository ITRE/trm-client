import axios from 'axios'
import config from '../config'


const Types = {
  FETCH_TICKETS: "FETCH_TICKETS",
  LOGIN: "Login",
  LOGOUT: "LOGOUT",
  ERROR: "ERROR"
};

// actions
const fetchTickets = tickets => ({
  type: Types.FETCH_TICKETS,
  payload: tickets
});

const logOut = () => ({
  type: Types.LOGOUT
});

const loginSuccessful = payload => ({
  type: Types.LOGIN,
  payload: payload
});

function login(credentials) {
  return function(dispatch) {
    return axios(`http://${config.api}/login`, {
      method: "post",
      data: {username: credentials.username, password: credentials.password},
      withCredentials: 'include'
    })
    .then( res => {
      console.log('Login Successful')
      localStorage.setItem('access token', res.data.token)
      return ({
        user: res.data.user,
        tickets: res.data.data
      })
    }, error => console.log(error))
    .then ( data => {
      return dispatch(loginSuccessful(data))
    })
  }
}

export default {
  fetchTickets,
  login,
  logOut,
  Types
};
