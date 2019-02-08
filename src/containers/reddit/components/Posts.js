import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Posts extends Component {
  render() {
    const { posts } = this.props;
    return (
      <ul>
        {posts.map(post => {
          const { name, title } = post;
          return <li key={name}>{title}</li>;
        })}
      </ul>
    );
  }
}

Posts.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object)
};

Posts.defaultProps = {
  posts: []
};
