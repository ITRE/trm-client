
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
    case ACTIONS.Types.ATTEMPT_SEND: {
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
      return {...state,
        tickets: action.payload.tickets,
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
