import React from "react";
import PropTypes from "prop-types";

const NewsArticle = ({ Title }) => {
  return <li>{Title}</li>;
};

NewsArticle.propTypes = {
  Title: PropTypes.string.isRequired
};

export default NewsArticle;
