import React, { Component } from "react";
import dateFns from "date-fns";
import PropTypes from "prop-types";
import { ChevronLeft, ChevronRight } from "./Icons";
import CalendarGame from "./CalendarGame";

class Calendar extends Component {
  state = {
    currentMonth: new Date(),
    selectedDate: new Date(),
    teamGames: {},
  };

  componentDidMount() {
    const { currentTeamAbrv, schedule } = this.props;
    this.setTeamGames(schedule, currentTeamAbrv);
  }

  componentDidUpdate(prevProps) {
    const {
      currentTeamAbrv: PrevTeamAbrv,
      schedule: PrevTeamSchedule,
    } = prevProps;

    const { currentTeamAbrv, schedule } = this.props;
    if (schedule !== PrevTeamSchedule || currentTeamAbrv !== PrevTeamAbrv) {
      this.setTeamGames(schedule, currentTeamAbrv);
    }
  }

  onDateClick = day => {
    this.setState({
      selectedDate: day,
    });
  };

  nextMonth = () => {
    const { currentMonth } = this.state;
    this.setState({
      currentMonth: dateFns.addMonths(currentMonth, 1),
    });
  };

  prevMonth = () => {
    const { currentMonth } = this.state;
    this.setState({
      currentMonth: dateFns.subMonths(currentMonth, 1),
    });
  };

  setTeamGames = (schedule, teamAbrv) => {
    this.setState({
      teamGames: schedule.reduce((games, game) => {
        const { Day, AwayTeam, HomeTeam } = game;
        const formatedDay = dateFns.format(new Date(Day), "YYYY-MM-DD");

        const teamGamesObj = games;
        teamGamesObj[formatedDay] = {
          ...game,
          opponent: AwayTeam === teamAbrv ? HomeTeam : AwayTeam,
        };

        return games;
      }, {}),
    });
  };

  renderCells() {
    const { currentMonth, selectedDate, teamGames } = this.state;
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
            onClick={() => this.onDateClick(dateFns.parse(cloneDay))}
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
  }

  renderDays() {
    const { currentMonth } = this.state;
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
  }

  renderHeader() {
    const dateFormat = "MMMM YYYY";
    const { currentMonth } = this.state;
    return (
      <header className="calendar__header calendar__row aligner__center--vertical">
        <div className="calendar__col aligner__center--start text-left">
          <button className="btn-icon" onClick={this.prevMonth} type="button">
            <ChevronLeft />
          </button>
        </div>
        <div className="calendar__col aligner__center--horitzontal text-center">
          <h5 className="text-uppercase text-bold">
            {dateFns.format(currentMonth, dateFormat)}
          </h5>
        </div>
        <div className="calendar__col aligner__center--end text-right">
          <button className="btn-icon" onClick={this.nextMonth} type="button">
            <ChevronRight />
          </button>
        </div>
      </header>
    );
  }

  render() {
    return (
      <div className="calendar">
        {this.renderHeader()}
        {this.renderDays()}
        {this.renderCells()}
      </div>
    );
  }
}

Calendar.propTypes = {
  schedule: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentTeamAbrv: PropTypes.string.isRequired,
};

export default Calendar;
