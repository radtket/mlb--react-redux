import React from "react";
import { ChevronLeft } from "../Icons";

const SlickPrevArrow = props => {
  return (
    <button {...props} type="button">
      <ChevronLeft />
    </button>
  );
};

export default SlickPrevArrow;
