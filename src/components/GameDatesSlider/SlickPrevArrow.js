/* eslint-disable react/forbid-prop-types */
import React from "react";
import PropTypes from "prop-types";
import { ChevronLeft } from "../Icons";

const SlickPrevArrow = ({ className, style, onClick }) => {
  return (
    <button
      className={className}
      onClick={onClick}
      style={{ ...style }}
      type="button">
      <ChevronLeft />
    </button>
  );
};

SlickPrevArrow.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  style: PropTypes.object,
};

SlickPrevArrow.defaultProps = {
  onClick: null,
  className: null,
  style: null,
};

export default SlickPrevArrow;
