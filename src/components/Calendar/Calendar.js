import React, { useState, useEffect } from "react";
import { addMonths, format, subMonths } from "date-fns";
import PropTypes from "prop-types";

import { CalendarHeader, CalendarDaysOfWeek, CalendarCells } from ".";
import { isObjectEmpty } from "../../utils/helpers";
import LoadingSpinner from "../LoadingSpinner";

const Calendar = ({ currentTeamAbrv, schedule }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [teamGames, setTeamGames] = useState({});

  const onDateClick = day => {
    setSelectedDate(day);
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

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

  useEffect(() => {
    isObjectEmpty(teamGames) &&
      setTeamGames(getTeamGames(schedule, currentTeamAbrv));
  });

  if (isObjectEmpty(teamGames)) {
    return <LoadingSpinner />;
  }

  return (
    <div className="calendar">
      <CalendarHeader
        prevMonth={prevMonth}
        nextMonth={nextMonth}
        currentMonthHeadline={format(currentMonth, "MMMM YYYY")}
      />
      <CalendarDaysOfWeek currentMonth={currentMonth} />
      <CalendarCells
        currentMonth={currentMonth}
        onDateClick={onDateClick}
        selectedDate={selectedDate}
        teamGames={teamGames}
      />
    </div>
  );
};

Calendar.propTypes = {
  schedule: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentTeamAbrv: PropTypes.string.isRequired,
};

export default Calendar;
