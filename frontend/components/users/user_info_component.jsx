import React from 'react';

class UserInfoComponent extends React.Component {

  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div className="profile-user-info">
        {this.props.user.name}
        <p>I acted in: {this.props.user.movie}</p>
        <p>For future gigs: {this.props.user.email}</p>
      </div>
    );
  }
}

export default UserInfoComponent;
