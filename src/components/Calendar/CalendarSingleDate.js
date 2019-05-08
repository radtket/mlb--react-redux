import React from "react";
import PropTypes from "prop-types";
import { isSameDay, isSameMonth, parse } from "date-fns";
import { CalendarSingleDateGame } from ".";

const CalendarSingleDate = ({
  day,
  formattedDate,
  gameOnDate,
  monthStart,
  onDateClick,
  selectedDate,
}) => {
  return (
    <button
      className={`calendar__col calendar__cell ${
        !isSameMonth(day, monthStart) ? "cell-disabled" : ""
      } ${isSameDay(day, selectedDate) ? "cell-selected" : ""}`}
      onClick={() => onDateClick(parse(day))}
      type="button">
      {gameOnDate && <CalendarSingleDateGame {...gameOnDate} />}
      <span className="calendar__cell--number">{formattedDate}</span>
      <span className="calendar__cell--bg">{formattedDate}</span>
    </button>
  );
};

CalendarSingleDate.propTypes = {
  day: PropTypes.instanceOf(Date).isRequired,
  formattedDate: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  gameOnDate: PropTypes.object,
  monthStart: PropTypes.instanceOf(Date).isRequired,
  onDateClick: PropTypes.func.isRequired,
  selectedDate: PropTypes.instanceOf(Date).isRequired,
};

CalendarSingleDate.defaultProps = {
  gameOnDate: null,
};

export default CalendarSingleDate;
