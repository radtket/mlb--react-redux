import React from "react";
import PropTypes from "prop-types";
import { ChevronRight } from "../Icons";

const SlickNextArrow = ({ className, style, onClick }) => {
  return (
    <button {...{ className, onClick, style }} type="button">
      <ChevronRight />
    </button>
  );
};

SlickNextArrow.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  style: PropTypes.shape({}),
};

SlickNextArrow.defaultProps = {
  onClick: null,
  className: null,
  style: null,
};

export default SlickNextArrow;
