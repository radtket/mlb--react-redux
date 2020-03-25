import React from "react";
import { format, startOfWeek, endOfWeek } from "date-fns";

const VisibleStartAndStopDays = ({ activeTab }) => (
  <h1>
    {`${format(startOfWeek(activeTab), "MMMM Do, YYYY")} - ${format(
      endOfWeek(activeTab),
      "MMMM Do, YYYY"
    )}`}
  </h1>
);
export default VisibleStartAndStopDays;
