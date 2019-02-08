import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  fetchPostsIfNeeded,
  invalidateSubreddit,
  selectSubreddit
} from "../../modules/reddit/reddit-actions";
import Picker from "./components/Picker";
import Posts from "./components/Posts";

class RedditAsyncApp extends Component {
  componentDidMount() {
    const { selectedSubreddit } = this.props;
    this.props.fetchPostsIfNeeded(selectedSubreddit);
  }

  componentDidUpdate(prevProps) {
    const { selectedSubreddit: thisSelectedSubredditt } = this.props;
    if (thisSelectedSubredditt !== prevProps.selectedSubreddit) {
      const { selectedSubreddit } = this.props;
      this.props.fetchPostsIfNeeded(selectedSubreddit);
    }
  }

  handleChange = nextSubreddit => {
    this.props.selectSubreddit(nextSubreddit);
    this.props.fetchPostsIfNeeded(nextSubreddit);
  };

  handleRefreshClick = e => {
    e.preventDefault();

    const { selectedSubreddit } = this.props;
    this.props.invalidateSubreddit(selectedSubreddit);
    this.props.fetchPostsIfNeeded(selectedSubreddit);
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
  lastUpdated: PropTypes.number
};

RedditAsyncApp.defaultProps = {
  posts: []
};

function mapStateToProps(state) {
  const { selectedSubreddit, postsBySubreddit } = state;
  const { isFetching, lastUpdated, items: posts } = postsBySubreddit[
    selectedSubreddit
  ] || {
    isFetching: true,
    items: []
  };

  return {
    selectedSubreddit,
    posts,
    isFetching,
    lastUpdated
  };
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchPostsIfNeeded,
      invalidateSubreddit,
      selectSubreddit
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { pure: false }
)(RedditAsyncApp);
