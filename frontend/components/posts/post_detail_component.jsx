import React from 'react';
import { Link } from 'react-router-dom';
import CommentContainer from '../comments/comment_container';
import PostActionContainer from './post_action_container';
import NewCommentContainer from '../comments/new_comment_container';
import DropdownContainer from '../dropdowns/dropdown_container';

class PostDetailComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = { dropdownVisible: false, users: false };

    this.handleDelete = this.handleDelete.bind(this);
    this.commentFocus = this.commentFocus.bind(this);
    this.handleDropdown = this.handleDropdown.bind(this);
    this.handleLikeToggle = this.handleLikeToggle.bind(this);
  }

  handleDelete() {
    this.props.deletePost(this.props.post);
  }

  handleLikeToggle () {
    if (this.props.post.currentUserLikes) {
      this.props.deleteLike({
        post_id: this.props.post.id,
        liker_id: this.props.currentUser.id
      });
    } else {
      this.props.createLike({ post: this.props.post });
    }
  }

  handleDropdown(e) {
    e.stopPropagation();
    this.props.displayDropdown(this.props.post.id);
  }

  componentDidMount() {
    if (!this.props.users[this.props.post.author_id]) {
      this.props.fetchUser({ id: this.props.post.author_id });
    } else if (!this.props.users[this.props.post.receiver_id]) {
      this.props.fetchUser({ id: this.props.post.receiver_id });
    }
  }

  commentFocus () {
    document.getElementById(`create-comment-textarea-${this.props.post.id}`).
      focus({ preventScroll: true });
  }

  render() {
    let comments;
    if (this.props.post.comments.length > 0) {
      if (Object.keys(this.props.comments).length < 1) {
        comments = null;
      } else {
        const that = this;
        comments = this.props.post.comments.map(id => {
          return (
            <CommentContainer
              key={ id }
              comment={ this.props.comments[id] }
              post={ that.props.post }
              />
          );
        });
      }
    } else {
      comments = null;
    }

    if (!this.props.post) return <p>Loading...</p>;
    if (!this.props.users[this.props.post.author_id]) return <p>Loading...</p>;
    if (!this.props.users[this.props.post.receiver_id]) return <p>Loading...</p>;

    const authorObj = this.props.users[this.props.post.author_id];

    let receiver;
    if (this.props.post.author_id === this.props.post.receiver_id) {
      receiver = null;
    } else {
      receiver = (
        <Link to={ `/users/${this.props.post.receiver_id}` }>
          { `> ${this.props.users[this.props.post.receiver_id].name}` }
        </Link>
      );
    }
    return (
      <div className="post-item">
        <div className="post-author-info">
          <div id="author-pic-and-name">
            <img src={ authorObj.profilePic }
              sizes="(max-height: 40px; max-width: 40px;)" >
            </img>
            <Link to={ `/users/${authorObj.id}` }>
              { `${authorObj.name} >` }
            </Link>
            { receiver }
          </div>
          <button onClick={ this.handleDropdown }>ˇ</button>
          {
            this.props.dropdownVisible ?
            <PostActionContainer
              post={ this.props.post }
              updatePost={ this.props.updatePost.bind(this) }
              /> : null
          }
        </div>
        <br />
        <div id="post-body">
          { this.props.post.body }
        </div>
        <div id="create-comment-icons">
          <div className='icons-create-comment' onClick={ this.handleLikeToggle }>
            <p>{ this.props.post.likes.length }</p>
            <i className="fa fa-thumbs-up" aria-hidden="true"></i>
            <p>Like</p>
          </div>
          <div className='icons-create-comment' onClick={ this.commentFocus }>
            <i className="fa fa-comment" aria-hidden="true"></i>
            <p>Comment</p>
          </div>
        </div>
        <ul>
          { comments }
        </ul>
        <NewCommentContainer
          post={ this.props.post }
          />
      </div>
    );
  }

}

export default PostDetailComponent;
