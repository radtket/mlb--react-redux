// import { handleErrors, handleSucces} from "../../utils/helpers";

export const REQUEST_POSTS = "REQUEST_POSTS";
export const RECEIVE_POSTS = "RECEIVE_POSTS";
export const SELECT_SUBREDDIT = "SELECT_SUBREDDIT";
export const INVALIDATE_SUBREDDIT = "INVALIDATE_SUBREDDIT";

export const selectSubreddit = subreddit => {
  return {
    type: SELECT_SUBREDDIT,
    subreddit,
  };
};

export const invalidateSubreddit = subreddit => {
  return {
    type: INVALIDATE_SUBREDDIT,
    subreddit,
  };
};

const requestPosts = subreddit => {
  return {
    type: REQUEST_POSTS,
    subreddit,
  };
};

const receivePosts = (subreddit, json) => {
  const { children } = json.data;
  return {
    type: RECEIVE_POSTS,
    subreddit,
    posts: children.map(child => child.data),
    receivedAt: Date.now(),
  };
};

const fetchPosts = subreddit => {
  return dispatch => {
    dispatch(requestPosts(subreddit));
    return fetch(`https://www.reddit.com/r/${subreddit}.json`)
      .then(response => response.json())
      .then(json => dispatch(receivePosts(subreddit, json)));
  };
};

const shouldFetchPosts = ({ postsBySubreddit }, subreddit) => {
  const posts = postsBySubreddit[subreddit];
  const { isFetching, didInvalidate } = posts;

  if (!posts) {
    return true;
  }

  if (isFetching) {
    return false;
  }

  return didInvalidate;
};

export const fetchPostsIfNeeded = subreddit => {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), subreddit)) {
      return dispatch(fetchPosts(subreddit));
    }
    return false;
  };
};
