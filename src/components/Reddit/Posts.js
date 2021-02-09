import React from "react";
import PropTypes from "prop-types";

const Posts = ({ posts }) => {
  return (
    <ul>
      {posts.map(({ name, title, url }) => {
        return (
          <li key={name}>
            <a href={url} rel="noopener noreferrer" target="_blank">
              {title}
            </a>
          </li>
        );
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
