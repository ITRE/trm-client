
import ACTIONS from "./action";
/*
const Types = {
  CREATE_ITEM: "CREATE_ITEM",
  DELETE_ITEM: "DELETE_ITEM"
};
*/

const defaultState = {
  tickets: [],
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
    case ACTIONS.Types.ATTEMPT_REQUEST:  {
      return {...state,
        isFetching: true
      };
    }
    case ACTIONS.Types.FETCH_TICKETS: {
      return state;
    }
    case ACTIONS.Types.LOGIN_SUCCESS: {
      return {...state,
        user: action.payload.user,
        tickets: action.payload.tickets,
        loggedIn: true,
        isFetching: false
      };
    }
    case ACTIONS.Types.SEND_SUCCESS: {
      const index = state.tickets.findIndex((ticket) => ticket._id === action.payload.tickets._id)
      let newTickets = [...state.tickets]
      console.log(newTickets[index])
      newTickets[index] = Object.assign(newTickets[index], action.payload.tickets)
      console.log(newTickets[index])
      return {...state,
        tickets: newTickets,
        isFetching: false
      };
    }
    case ACTIONS.Types.REQUEST_SUCCESS: {
      let newTickets = [...state.tickets]
      newTickets.push(action.payload)
      return {...state,
        tickets: newTickets,
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
      return {...state,
        error: action.payload,
        isFetching: false
      };
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
