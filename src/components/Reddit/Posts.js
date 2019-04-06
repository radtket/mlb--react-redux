import React from "react";
import PropTypes from "prop-types";

const Posts = ({ posts }) => {
  return (
    <ul>
      {posts.map(post => {
        const { name, title } = post;
        return <li key={name}>{title}</li>;
      })}
    </ul>
  );
};

Posts.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object),
};

Posts.defaultProps = {
  posts: [],
};

export default Posts;
