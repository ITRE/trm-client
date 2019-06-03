import axios from 'axios'
import config from '../config'


const Types = {
  FETCH_TICKETS: "FETCH_TICKETS",
  LOGIN: "Login",
  LOGOUT: "LOGOUT",
  ERROR: "ERROR",
  ATTEMPT_LOGIN: "ATTEMPT_LOGIN",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAILURE: "LOGIN_FAILURE",
  CLEAR_ERROR: "CLEAR_ERROR"
};

// actions
const fetchTickets = tickets => ({
  type: Types.FETCH_TICKETS,
  payload: tickets
});

const logOut = () => ({
  type: Types.LOGOUT
});

const clearError = () => ({
  type: Types.CLEAR_ERROR
});

const login = (credentials) => (dispatch, getState) => {

  dispatch({
    type: Types.ATTEMPT_LOGIN,
    payload: credentials
  })

  return axios(`http://${config.api}/login`, {
    method: "post",
    data: {username: credentials.username, password: credentials.password},
    withCredentials: 'include'
  })
  .then(res => {
    console.log(res.data)
    dispatch({
      type: Types.LOGIN_SUCCESS,
      payload: {
        user: res.data.user,
        tickets: [...res.data.data]
      }
    })
  }, error => {
    dispatch({
      type: Types.LOGIN_FAILURE,
      payload: error
    })
  })
}


/*
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
    .catch(error => dispatch(loginFailure(error)))
  }
}
*/
export default {
  fetchTickets,
  login,
  logOut,
  clearError,
  Types
};
