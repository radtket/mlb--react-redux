import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPostsIfNeeded,
  invalidateSubreddit,
  selectSubreddit,
} from "../modules/reddit/reddit-actions";

import Picker from "../components/Reddit/Picker";
import Posts from "../components/Reddit/Posts";
import LoadingSpinner from "../components/LoadingSpinner";
import { isArrayEmpty } from "../utils/helpers";

const getit = ({ postsBySubreddit, selectedSubreddit }) => {
  const { items, ...rest } = postsBySubreddit[selectedSubreddit] || {
    isFetching: true,
    items: [],
  };

  return {
    selectedSubreddit,
    posts: items,
    ...rest,
  };
};

const RedditAsyncApp = () => {
  const dispatch = useDispatch();
  const {
    selectedSubreddit,
    isFetching,
    lastUpdated,
    posts,
    didInvalidate,
  } = useSelector(getit);

  useEffect(() => {
    dispatch(fetchPostsIfNeeded(selectedSubreddit));
  }, [dispatch, selectedSubreddit]);

  return (
    <div>
      <Picker
        onChange={nextSubreddit => {
          dispatch(selectSubreddit(nextSubreddit));
          dispatch(fetchPostsIfNeeded(nextSubreddit));
        }}
        options={["reactjs", "frontend"]}
        value={selectedSubreddit}
      />
      <p>
        {lastUpdated && (
          <span>
            Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
          </span>
        )}
        {!isFetching && (
          <button
            onClick={e => {
              e.preventDefault();
              dispatch(invalidateSubreddit(selectedSubreddit));
              dispatch(fetchPostsIfNeeded(selectedSubreddit));
            }}
            type="button"
          >
            Refresh
          </button>
        )}
      </p>
      {isArrayEmpty(posts) &&
        (isFetching ? <LoadingSpinner /> : <h2>Empty.</h2>)}

      {posts.length > 0 && (
        <div style={{ opacity: isFetching ? 0.5 : 1 }}>
          <Posts posts={posts} />
        </div>
      )}
    </div>
  );
};

export default RedditAsyncApp;
