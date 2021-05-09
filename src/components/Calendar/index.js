import React, { useState } from "react";
import { addMonths, format, subMonths } from "date-fns";
import PropTypes from "prop-types";

import CalendarCells from "./CalendarCells";
import CalendarDaysOfWeek from "./CalendarDaysOfWeek";
import CalendarHeader from "./CalendarHeader";
import { isObjectEmpty } from "../../utils/helpers";
import LoadingSpinner from "../LoadingSpinner";

const Calendar = ({ currentTeamAbrv, schedule }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const teamGames = schedule.reduce((games, game) => {
    const { Day, AwayTeam, HomeTeam } = game;

    return {
      ...games,
      [format(new Date(Day), "YYYY-MM-DD")]: {
        ...game,
        opponent: AwayTeam === currentTeamAbrv ? HomeTeam : AwayTeam,
      },
    };
  }, {});

  if (isObjectEmpty(teamGames)) {
    return <LoadingSpinner />;
  }

  return (
    <div className="calendar">
      <CalendarHeader
        currentMonthHeadline={format(currentMonth, "MMMM YYYY")}
        {...{
          prevMonth: () => {
            setCurrentMonth(subMonths(currentMonth, 1));
          },
          nextMonth: () => {
            setCurrentMonth(addMonths(currentMonth, 1));
          },
        }}
      />
      <CalendarDaysOfWeek {...{ currentMonth }} />
      <CalendarCells
        {...{
          teamGames,
          selectedDate,
          onDateClick: day => {
            setSelectedDate(day);
          },
          currentMonth,
        }}
      />
    </div>
  );
};

Calendar.propTypes = {
  schedule: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentTeamAbrv: PropTypes.string.isRequired,
};

export default Calendar;
