import { Link, Redirect, withRouter } from 'react-router-dom';
import React from 'react';
import values from 'lodash/values';
import PostDetailComponent from './post_detail_component';


class PostsComponent extends React.Component {
  constructor(props) {
    super(props);
  }

// eventually, will need to add link to
// author profile page, so Ill bring up list of
// friends of currentUser to this state ??
// need friendships table now
// need user up at the feed page
  render() {

    const posts = values(this.props.posts).map((post) => {
      return(
        <PostDetailComponent post={post} />
      );
    });

    return(
      <ul>
        {posts}
      </ul>
    );
  }
}

export default PostsComponent;
