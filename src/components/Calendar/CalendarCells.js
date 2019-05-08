import React from "react";
import PropTypes from "prop-types";
import {
  addDays,
  endOfMonth,
  endOfWeek,
  format,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { CalendarSingleDate } from ".";

const CalendarCells = ({
  currentMonth,
  onDateClick,
  selectedDate,
  teamGames,
}) => {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const dateFormat = "D";
  const rows = [];

  let days = [];
  let day = startDate;
  let formattedDate = "";

  while (day <= endDate) {
    for (let i = 0; i < 7; i += 1) {
      formattedDate = format(day, dateFormat);
      const formatedDay = format(new Date(day), "YYYY-MM-DD");
      days.push(
        <CalendarSingleDate
          day={day}
          formattedDate={formattedDate}
          gameOnDate={teamGames[formatedDay]}
          key={day}
          monthStart={monthStart}
          onDateClick={onDateClick}
          selectedDate={selectedDate}
        />
      );
      day = addDays(day, 1);
    }
    rows.push(
      <div className="calendar__row" key={day}>
        {days}
      </div>
    );
    days = [];
  }

  return <div className="calendar__body">{rows}</div>;
};

CalendarCells.propTypes = {
  currentMonth: PropTypes.instanceOf(Date).isRequired,
  onDateClick: PropTypes.func.isRequired,
  selectedDate: PropTypes.instanceOf(Date).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  teamGames: PropTypes.object.isRequired,
};

export default CalendarCells;
