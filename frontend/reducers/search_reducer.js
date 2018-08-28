import { merge } from 'lodash';
import { RECEIVE_SEARCHED_USERS } from '../actions/user_actions';

const preloadedState = {};

const searchReducer = (state = preloadedState, action ) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_SEARCHED_USERS: {
      return action.users;
    }
    default:
      return state;
  }
};

export default searchReducer;
