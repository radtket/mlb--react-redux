import React from "react";
import PropTypes from "prop-types";
import { format, startOfWeek, endOfWeek } from "date-fns";

const VisibleStartAndStopDays = ({ activeTab }) => {
  return (
    <h1>
      {`${format(startOfWeek(activeTab), "MMMM Do, YYYY")} - ${format(
        endOfWeek(activeTab),
        "MMMM Do, YYYY"
      )}`}
    </h1>
  );
};

VisibleStartAndStopDays.propTypes = {
  // !TODO: Make date rather than string
  activeTab: PropTypes.string.isRequired,
};

export default VisibleStartAndStopDays;
