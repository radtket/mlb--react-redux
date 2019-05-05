import React, { useState, useEffect } from "react";
import dateFns from "date-fns";
import PropTypes from "prop-types";
import { ChevronLeft, ChevronRight } from "../Icons";
import CalendarGame from "./CalendarGame";
import { isObjectEmpty } from "../../utils/helpers";

const Calendar = ({ currentTeamAbrv, schedule }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [teamGames, setTeamGames] = useState({});

  const onDateClick = day => {
    setSelectedDate(day);
  };

  const nextMonth = () => {
    setCurrentMonth(dateFns.addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(dateFns.subMonths(currentMonth, 1));
  };

  const getTeamGames = (scheduleArg, teamAbrvArg) => {
    return scheduleArg.reduce((games, game) => {
      const { Day, AwayTeam, HomeTeam } = game;
      const formatedDay = dateFns.format(new Date(Day), "YYYY-MM-DD");

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

  const renderCells = () => {
    const monthStart = dateFns.startOfMonth(currentMonth);
    const monthEnd = dateFns.endOfMonth(monthStart);
    const startDate = dateFns.startOfWeek(monthStart);
    const endDate = dateFns.endOfWeek(monthEnd);

    const dateFormat = "D";
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i += 1) {
        formattedDate = dateFns.format(day, dateFormat);
        const cloneDay = day;
        const formatedDay = dateFns.format(new Date(cloneDay), "YYYY-MM-DD");

        const gameOnDate = teamGames[formatedDay];

        days.push(
          <button
            className={`calendar__col calendar__cell ${
              !dateFns.isSameMonth(day, monthStart) ? "cell-disabled" : ""
            } ${dateFns.isSameDay(day, selectedDate) ? "cell-selected" : ""}`}
            key={day}
            onClick={() => onDateClick(dateFns.parse(cloneDay))}
            type="button">
            {gameOnDate && CalendarGame(gameOnDate)}
            <span className="calendar__cell--number">{formattedDate}</span>
            <span className="calendar__cell--bg">{formattedDate}</span>
          </button>
        );
        day = dateFns.addDays(day, 1);
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

  const renderDays = () => {
    const dateFormat = "dddd";
    const days = [];

    const startDate = dateFns.startOfWeek(currentMonth);

    for (let i = 0; i < 7; i += 1) {
      days.push(
        <div
          className="calendar__col aligner__center--horitzontal text-center"
          key={i}>
          {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
        </div>
      );
    }

    return (
      <div className="calendar__row calendar__row--days text-small text-semibold text-uppercase">
        {days}
      </div>
    );
  };

  const renderHeader = () => {
    const dateFormat = "MMMM YYYY";

    return (
      <header className="calendar__header calendar__row aligner__center--vertical">
        <div className="calendar__col aligner__center--start text-left">
          <button className="btn-icon" onClick={prevMonth} type="button">
            <ChevronLeft />
          </button>
        </div>
        <div className="calendar__col aligner__center--horitzontal text-center">
          <h5 className="text-uppercase text-bold">
            {dateFns.format(currentMonth, dateFormat)}
          </h5>
        </div>
        <div className="calendar__col aligner__center--end text-right">
          <button className="btn-icon" onClick={nextMonth} type="button">
            <ChevronRight />
          </button>
        </div>
      </header>
    );
  };
  return (
    <div className="calendar">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
};

Calendar.propTypes = {
  schedule: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentTeamAbrv: PropTypes.string.isRequired,
};

export default Calendar;
