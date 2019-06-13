import axios from 'axios'
import config from '../config'


const Types = {
  FETCH_TICKETS: "FETCH_TICKETS",
  ATTEMPT_LOGIN: "ATTEMPT_LOGIN",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  ATTEMPT_REQUEST: "ATTEMPT_REQUEST",
  REQUEST_SUCCESS: "REQUEST_SUCCESS",
  ATTEMPT_UPLOAD: "ATTEMPT_UPLOAD",
  UPLOAD_SUCCESS: "UPLOAD_SUCCESS",
  ATTEMPT_SEND: "ATTEMPT_SEND",
  SEND_SUCCESS: "SEND_SUCCESS",
  ATTEMPT_APPROVE: "ATTEMPT_APPROVE",
  APPROVE_SUCCESS: "APPROVE_SUCCESS",
  ATTEMPT_NEW_USER: "ATTEMPT_NEW_USER",
  NEW_USER_SUCCESS: "NEW_USER_SUCCESS",
  ATTEMPT_UPDATE_USER: "ATTEMPT_UPDATE_USER",
  UPDATE_USER_SUCCESS: "UPDATE_USER_SUCCESS",
  CLEAR_ERROR: "CLEAR_ERROR",
  ERROR: "ERROR",
  LOGOUT: "LOGOUT"
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

const login = (credentials) => (dispatch) => {
  dispatch({
    type: Types.ATTEMPT_LOGIN,
    payload: credentials
  })

  return axios(`http://${config.api}/login`, {
    method: "post",
    data: {username: credentials.username, password: credentials.password},
    withCredentials: 'include'
  }).then(res => {
    console.log(res.data)
    dispatch({
      type: Types.LOGIN_SUCCESS,
      payload: {
        user: res.data.user,
        users: [...res.data.users],
        tickets: [...res.data.data]
      }
    })
  }).catch(error => {
    dispatch({
      type: Types.ERROR,
      payload: error
    })
  })
}

const newUser = (info) => (dispatch) => {
  dispatch({
    type: Types.ATTEMPT_NEW_USER,
    payload: info
  })

  return axios(`http://${config.api}/admin`, {
    method: "post",
    data: {
      username: info.username,
      password: info.password,
      name: info.name,
      email: info.email,
      role: info.role
    },
    withCredentials: 'include'
  }).then(res => {
    console.log(res.data)
    dispatch({
      type: Types.NEW_USER_SUCCESS,
      payload: {
        user: res.data.user,
        tickets: [...res.data.data]
      }
    })
  }).catch(error => {
    dispatch({
      type: Types.ERROR,
      payload: error
    })
  })
}
const updateUser = (info) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: Types.ATTEMPT_UPDATE_USER,
      payload: info
    })

    return axios(`http://${config.api}/admin/${info.username}`, {
      method: "put",
      data: {
        username: info.username,
        password: info.password,
        name: info.name,
        email: info.email,
        role: info.role
      },
      withCredentials: 'include'
    }).then(res => {
      dispatch({
        type: Types.UPDATE_USER_SUCCESS,
        payload: {
          user: res.data.data
        }
      })
      resolve(res.data.data)
    }).catch(error => {
      dispatch({
        type: Types.ERROR,
        payload: error
      })
      reject(error)
    })
  })
}

const sendEmail = (ticket, log, email) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: Types.ATTEMPT_SEND
    })

    axios(`http://${config.api}/tickets/${ticket._id}`, {
      method: "put",
      data: {
        ticket: ticket,
        log: log,
        email: email
      },
      withCredentials: 'include'
    })
    .then(res => {
      dispatch({
        type: Types.SEND_SUCCESS,
        payload: {
          tickets: res.data.data
        }
      })
      resolve(res.data.data)
    })
    .catch(error => {
      dispatch({
        type: Types.ERROR,
        payload: error
      })
      reject(error)
    })
  })
}

const requestDownload = (ticket, kind) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: Types.ATTEMPT_REQUEST
    })

    axios(`http://${config.api}/messages`, {
      method: "post",
      data: {
        ticket: ticket,
        kind: kind,
      },
      withCredentials: 'include'
    })
    .then(res => {
      console.log(res)
      dispatch({
        type: Types.REQUEST_SUCCESS
      })
      resolve('Success')
    })
    .catch(error => {
      dispatch({
        type: Types.ERROR,
        payload: error
      })
      reject(error)
    })
  })
}

const approveDownload = (ticket, kind, log) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: Types.ATTEMPT_APPROVE
    })

    axios(`http://${config.api}/messages/${ticket._id}`, {
      method: "put",
      data: {
        ticket: ticket,
        kind: kind,
        log: log
      },
      withCredentials: 'include'
    })
    .then(res => {
      console.log(res)
      dispatch({
        type: Types.APPROVE_SUCCESS,
        payload: res.data.data
      })
      resolve(res.data.data)
    })
    .catch(error => {
      dispatch({
        type: Types.ERROR,
        payload: error
      })
      reject(error)
    })
  })
}

const updateDownload = (upload, email) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: Types.ATTEMPT_UPLOAD
    })

    axios(`http://${config.api}/version`, {
      method: "post",
      data: {
        files: upload,
        email: email
      },
      withCredentials: 'include'
    })
    .then(res => {
      dispatch({
        type: Types.UPLOAD_SUCCESS
      })
      resolve(res.data.data)
    })
    .catch(error => {
      dispatch({
        type: Types.ERROR,
        payload: error
      })
      reject(error)
    })
  })
}

export default {
  fetchTickets,
  login,
  logOut,
  newUser,
  updateUser,
  sendEmail,
  requestDownload,
  approveDownload,
  updateDownload,
  clearError,
  Types
};
