import React, { useState } from "react";
import { addMonths, format, subMonths } from "date-fns";
import PropTypes from "prop-types";

import CalendarCells from "./CalendarCells";
import CalendarDaysOfWeek from "./CalendarDaysOfWeek";
import CalendarHeader from "./CalendarHeader";
import { isObjectEmpty } from "../../utils/helpers";
import LoadingSpinner from "../LoadingSpinner";

const getTeamGames = (scheduleArg, teamAbrvArg) => {
  return scheduleArg.reduce((games, game) => {
    const { Day, AwayTeam, HomeTeam } = game;
    const formatedDay = format(new Date(Day), "YYYY-MM-DD");

    const teamGamesObj = games;
    teamGamesObj[formatedDay] = {
      ...game,
      opponent: AwayTeam === teamAbrvArg ? HomeTeam : AwayTeam,
    };

    return games;
  }, {});
};

const Calendar = ({ currentTeamAbrv, schedule }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const teamGames = getTeamGames(schedule, currentTeamAbrv);

  const onDateClick = day => {
    setSelectedDate(day);
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  if (isObjectEmpty(teamGames)) {
    return <LoadingSpinner />;
  }

  return (
    <div className="calendar">
      <CalendarHeader
        currentMonthHeadline={format(currentMonth, "MMMM YYYY")}
        {...{ prevMonth, nextMonth }}
      />
      <CalendarDaysOfWeek {...{ currentMonth }} />
      <CalendarCells
        {...{ teamGames, selectedDate, onDateClick, currentMonth }}
      />
    </div>
  );
};

Calendar.propTypes = {
  schedule: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentTeamAbrv: PropTypes.string.isRequired,
};

export default Calendar;
