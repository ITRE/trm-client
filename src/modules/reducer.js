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
  loggedIn: false
};

const todoReducer = (state = defaultState, action) => {
  console.log(action);
  switch (action.type) {
    case ACTIONS.Types.FETCH_TICKETS: {
      return state;
    }

    case ACTIONS.Types.LOGIN: {
      return {...state,
        user: action.payload.user,
        tickets: action.payload.tickets,
        loggedIn: true
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
      return state;
    }

    default:
      return state;
  }
};

export default todoReducer;
