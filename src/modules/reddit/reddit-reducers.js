import {
  SELECT_SUBREDDIT,
  INVALIDATE_SUBREDDIT,
  REQUEST_POSTS,
  RECEIVE_POSTS,
} from "./reddit-actions";

const initalState = {
  isFetching: false,
  didInvalidate: false,
  items: [],
};

const postsDude = (state = initalState, { type, posts, receivedAt }) => {
  switch (type) {
    case INVALIDATE_SUBREDDIT:
      return { ...state, didInvalidate: true };
    case REQUEST_POSTS:
      return { ...state, isFetching: true, didInvalidate: false };
    case RECEIVE_POSTS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: posts,
        lastUpdated: receivedAt,
      };
    default:
      return state;
  }
};

export const selectedSubreddit = (state = "reactjs", { type, subreddit }) => {
  switch (type) {
    case SELECT_SUBREDDIT:
      return subreddit;
    default:
      return state;
  }
};

export const postsBySubreddit = (
  state = {},
  { type, subreddit, posts, receivedAt }
) => {
  switch (type) {
    case INVALIDATE_SUBREDDIT:
    case RECEIVE_POSTS:
    case REQUEST_POSTS:
      return {
        ...state,
        [subreddit]: postsDude(state[subreddit], { type, posts, receivedAt }),
      };
    default:
      return state;
  }
};
