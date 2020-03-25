import React from "react";
import PropTypes from "prop-types";

const SlickArrow = ({ className, style, onClick, children }) => {
  return (
    <button {...{ className, style, onClick }} type="button">
      {children}
    </button>
  );
};

SlickArrow.propTypes = {
  className: PropTypes.string,
  style: PropTypes.shape({}),
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
};

SlickArrow.defaultProps = {
  className: "",
  style: {},
  onClick: null,
};

export default SlickArrow;
