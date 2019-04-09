import React, { Component } from "react";
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

class RedditAsyncApp extends Component {
  componentDidMount() {
    const {
      selectedSubreddit,
      fetchPostsIfNeeded: getPostsIfNeeded,
    } = this.props;
    getPostsIfNeeded(selectedSubreddit);
  }

  componentDidUpdate(prevProps) {
    const { selectedSubreddit: thisSelectedSubredditt } = this.props;
    if (thisSelectedSubredditt !== prevProps.selectedSubreddit) {
      const {
        selectedSubreddit,
        fetchPostsIfNeeded: getPostsIfNeeded,
      } = this.props;
      getPostsIfNeeded(selectedSubreddit);
    }
  }

  handleChange = nextSubreddit => {
    const {
      selectSubreddit: activeSelectSubreddit,
      fetchPostsIfNeeded: getPostsIfNeeded,
    } = this.props;
    activeSelectSubreddit(nextSubreddit);
    getPostsIfNeeded(nextSubreddit);
  };

  handleRefreshClick = e => {
    e.preventDefault();

    const {
      selectedSubreddit,
      fetchPostsIfNeeded: getPostsIfNeeded,
      invalidateSubreddit: invalidSubreddit,
    } = this.props;
    invalidSubreddit(selectedSubreddit);
    getPostsIfNeeded(selectedSubreddit);
  };

  render() {
    const { selectedSubreddit, posts, isFetching, lastUpdated } = this.props;
    return (
      <div>
        <Picker
          value={selectedSubreddit}
          onChange={this.handleChange}
          options={["reactjs", "frontend"]}
        />
        <p>
          {lastUpdated && (
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.{" "}
            </span>
          )}
          {!isFetching && (
            <button onClick={this.handleRefreshClick} type="button">
              Refresh
            </button>
          )}
        </p>
        {isFetching && posts.length === 0 && <h2>Loading...</h2>}
        {!isFetching && posts.length === 0 && <h2>Empty.</h2>}
        {posts.length > 0 && (
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <Posts posts={posts} />
          </div>
        )}
      </div>
    );
  }
}

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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { pure: false }
)(RedditAsyncApp);
