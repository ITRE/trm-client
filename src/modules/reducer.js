
import ACTIONS from "./action";
/*
const Types = {
  CREATE_ITEM: "CREATE_ITEM",
  DELETE_ITEM: "DELETE_ITEM"
};
*/

const defaultState = {
  tickets: [],
  users: [],
  user: {},
  loggedIn: false,
  error: '',
  isFetching: false
};

const todoReducer = (state = defaultState, action) => {
  console.log(action);
  switch (action.type) {
    case ACTIONS.Types.ATTEMPT_LOGIN:
    case ACTIONS.Types.ATTEMPT_SEND:
    case ACTIONS.Types.ATTEMPT_REQUEST:
    case ACTIONS.Types.ATTEMPT_APPROVE:
    case ACTIONS.Types.ATTEMPT_NEW_USER:
    case ACTIONS.Types.ATTEMPT_UPDATE_USER:  {
      return {...state,
        isFetching: true
      };
    }
    case ACTIONS.Types.FETCH_TICKETS: {
      return state;
    }
    case ACTIONS.Types.LOGIN_SUCCESS:
    case ACTIONS.Types.NEW_USER_SUCCESS: {
      return {...state,
        user: action.payload.user,
        tickets: action.payload.tickets,
        users: action.payload.users,
        loggedIn: true,
        isFetching: false
      };
    }
    case ACTIONS.Types.UPDATE_USER_SUCCESS: {
      return {...state,
        user: action.payload.user,
        isFetching: false
      };
    }
    case ACTIONS.Types.SEND_SUCCESS: {
      const index = state.tickets.findIndex((ticket) => ticket._id === action.payload.tickets._id)
      let newTickets = [...state.tickets]
      newTickets[index] = Object.assign(newTickets[index], action.payload.tickets)
      return {...state,
        tickets: newTickets,
        isFetching: false
      };
    }
    case ACTIONS.Types.APPROVE_SUCCESS: {
      const index = state.tickets.findIndex((ticket) => ticket._id === action.payload._id)
      let newTickets = [...state.tickets]
      newTickets[index] = Object.assign(newTickets[index], action.payload)
      return {...state,
        tickets: newTickets,
        isFetching: false
      };
    }
    case ACTIONS.Types.REQUEST_SUCCESS: {
      return {...state,
        isFetching: false
      };
    }
    case ACTIONS.Types.LOGOUT: {
      localStorage.removeItem('access token');
      return {...state,
        user: {},
        tickets: [],
        loggedIn: false
      };
    }
    case ACTIONS.Types.ERROR: {
      if (typeof action.payload === 'object') {
        return {...state,
          error: action.payload.response.data.msg,
          isFetching: false
        }
      }
      return {...state,
        error: action.payload,
        isFetching: false
      }
    }
    case ACTIONS.Types.CLEAR_ERROR: {
      return {...state,
        error: ''
      };
    }

    default:
      return state;
  }
};

export default todoReducer;
