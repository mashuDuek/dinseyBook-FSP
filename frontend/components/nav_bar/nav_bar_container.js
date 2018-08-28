import { connect } from 'react-redux';
import NavBar from './nav_bar_component';
import { withRouter } from 'react-router-dom';
import { showDropdown, hideDropdown } from '../../actions/dropdown_actions';
import { logout } from '../../actions/session_actions';
import { searchUsers } from '../../actions/user_actions';

const mapStatetoProps = (state, ownProps) => {
  let pendingFriends;
  if (!state.session.currentUser) {
    pendingFriends = null;
  } else {
    pendingFriends = state.session.currentUser.pendingFriends;
  }

  return {
    pendingFriends,
    currentUser: state.session.currentUser,
    searchedUsers: state.entities.search
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    hideDropdown: () => dispatch(hideDropdown()),
    showDropdown: comp => dispatch(showDropdown(comp)),
    searchUsers: input => dispatch(searchUsers(input)),
    logout: () => dispatch(logout())
  };
};

export default withRouter(connect(
  mapStatetoProps,
  mapDispatchToProps
)(NavBar));
