import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  fetchPostsIfNeeded,
  invalidateSubreddit,
  selectSubreddit,
} from "../modules/reddit/reddit-actions";

import Picker from "../components/Reddit/Picker";
import Posts from "../components/Reddit/Posts";
import LoadingSpinner from "../components/LoadingSpinner";
import { isArrayEmpty } from "../utils/helpers";

const RedditAsyncApp = ({
  selectedSubreddit,
  posts,
  isFetching,
  lastUpdated,
  fetchPostsIfNeeded: getPostsIfNeeded,
  selectSubreddit: activeSelectSubreddit,
  invalidateSubreddit: invalidSubreddit,
}) => {
  useEffect(() => {
    return () => {
      getPostsIfNeeded(selectedSubreddit);
    };
  }, []);

  const handleChange = nextSubreddit => {
    activeSelectSubreddit(nextSubreddit);
    getPostsIfNeeded(nextSubreddit);
  };

  const handleRefreshClick = e => {
    e.preventDefault();
    invalidSubreddit(selectedSubreddit);
    getPostsIfNeeded(selectedSubreddit);
  };

  return (
    <div>
      <Picker
        onChange={handleChange}
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
          <button onClick={handleRefreshClick} type="button">
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

RedditAsyncApp.propTypes = {
  selectedSubreddit: PropTypes.string.isRequired,
  posts: PropTypes.arrayOf(PropTypes.object),
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  fetchPostsIfNeeded: PropTypes.func.isRequired,
  selectSubreddit: PropTypes.func.isRequired,
  invalidateSubreddit: PropTypes.func.isRequired,
};

RedditAsyncApp.defaultProps = {
  posts: [],
  lastUpdated: null,
};

function mapStateToProps(state) {
  const { selectedSubreddit, postsBySubreddit } = state;
  const { isFetching, lastUpdated, items: posts } = postsBySubreddit[
    selectedSubreddit
  ] || {
    isFetching: true,
    items: [],
  };

  return {
    selectedSubreddit,
    posts,
    isFetching,
    lastUpdated,
  };
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchPostsIfNeeded,
      invalidateSubreddit,
      selectSubreddit,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(RedditAsyncApp);
