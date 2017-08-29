import * as APIUtil from '../util/session_api_util';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';

export const receiveCurrentUser = (currentUser) => {

  return {
    type: RECEIVE_CURRENT_USER,
    currentUser: currentUser
  };
};

export const receiveErrors = (errors) => {

  return {
    type: RECEIVE_ERRORS,
    errors: errors
  };
};

export const signup = (user) => {
  return (dispatch) => {
    return APIUtil.signup(user).
      then(
        (user) => dispatch(receiveCurrentUser(user)),
        (errors) => {
          dispatch(receiveErrors([errors.statusText]));
        }
    );
  };
};

export const login = (user) => {
  return (dispatch) => {
    return APIUtil.login(user).
      then(
        (user) => dispatch(receiveCurrentUser(user)),
        (errors) => dispatch(receiveErrors(errors))
    );
  };
};


export const logout = () => {
  return (dispatch) => {
    return APIUtil.logout().
      then(
        () => dispatch(receiveCurrentUser(null)),
        (errors) => dispatch(receiveErrors(errors))
    );
  };
};
