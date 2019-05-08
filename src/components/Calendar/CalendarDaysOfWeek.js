import React from "react";
import PropTypes from "prop-types";
import { addDays, format, startOfWeek } from "date-fns";

const CalendarDaysOfWeek = ({ currentMonth }) => {
  const dateFormat = "dddd";
  const days = [];

  const startDate = startOfWeek(currentMonth);

  for (let i = 0; i < 7; i += 1) {
    days.push(
      <div
        className="calendar__col aligner__center--horitzontal text-center"
        key={i}>
        {format(addDays(startDate, i), dateFormat)}
      </div>
    );
  }

  return (
    <div className="calendar__row calendar__row--days text-small text-semibold text-uppercase">
      {days}
    </div>
  );
};

CalendarDaysOfWeek.propTypes = {
  currentMonth: PropTypes.instanceOf(Date).isRequired,
};

export default CalendarDaysOfWeek;
