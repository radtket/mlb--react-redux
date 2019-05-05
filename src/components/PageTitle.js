import React from "react";
import PropTypes from "prop-types";

const PageTitle = ({ title }) => {
  return (
    <header className="page-title">
      <h3>{title}</h3>
    </header>
  );
};

PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export default PageTitle;
