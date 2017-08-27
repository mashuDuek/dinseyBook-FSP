import { merge } from 'lodash';
import { RECEIVE_POST,
    FETCH_ALL_POSTS,
    UPDATE_POST,
    DELETE_POST,
    RECEIVE_ERRORS
  } from '../actions/posts_actions';

const preloadedState = {};

const postReducer = (state = preloadedState, action ) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_POST: {
      const newPost = { [action.post.id]: action.post };
      return merge({}, state, newPost);
    }
    case FETCH_ALL_POSTS: {
      const newPosts = {};
      action.posts.map((post) => {
        delete post.author;
        newPosts[post.id] = post;
      });
      return merge({}, state, newPosts);
    }
    case UPDATE_POST: {
      return merge({}, state, { [action.post.id]: action.post });
    }
    case DELETE_POST: {
      return action.post;
    }
    default: {
      return state;
    }
  }
};

export default postReducer;
