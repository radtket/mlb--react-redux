import React from "react";
import PropTypes from "prop-types";

const Posts = ({ posts }) => {
  return (
    <ul>
      {posts.map(post => {
        const { name, title, url } = post;
        return (
          <li key={name}>
            <a href={url} target="_blank" rel="noopener noreferrer">
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
