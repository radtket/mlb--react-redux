import React from "react";
import PropTypes from "prop-types";
import { isSameDay, isSameMonth, parse } from "date-fns";
import classNames from "classnames";
import CalendarSingleDateGame from "./CalendarSingleDateGame";

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
      className={classNames("calendar__col calendar__cell", {
        "cell-disabled": !isSameMonth(day, monthStart),
        "cell-selected": isSameDay(day, selectedDate),
      })}
      onClick={() => onDateClick(parse(day))}
      type="button"
    >
      {gameOnDate && <CalendarSingleDateGame {...gameOnDate} />}
      <span className="calendar__cell--number">{formattedDate}</span>
      <span className="calendar__cell--bg">{formattedDate}</span>
    </button>
  );
};

CalendarSingleDate.propTypes = {
  day: PropTypes.instanceOf(Date).isRequired,
  formattedDate: PropTypes.string.isRequired,
  gameOnDate: PropTypes.shape({}),
  monthStart: PropTypes.instanceOf(Date).isRequired,
  onDateClick: PropTypes.func.isRequired,
  selectedDate: PropTypes.instanceOf(Date).isRequired,
};

CalendarSingleDate.defaultProps = {
  gameOnDate: null,
};

export default CalendarSingleDate;
