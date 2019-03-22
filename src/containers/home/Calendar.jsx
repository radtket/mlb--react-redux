import React, { Component } from "react";
import dateFns from "date-fns";
import { ChevronLeft, ChevronRight } from "../../components/Icons";

class Calendar extends Component {
  state = {
    currentMonth: new Date(),
    selectedDate: new Date(),
  };

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

  renderCells() {
    const { currentMonth, selectedDate } = this.state;
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
        days.push(
          <button
            className={`col cell ${
              !dateFns.isSameMonth(day, monthStart) ? "disabled" : ""
            } ${dateFns.isSameDay(day, selectedDate) ? "selected" : ""}`}
            key={day}
            onClick={() => this.onDateClick(dateFns.parse(cloneDay))}
            type="button">
            <span className="number">{formattedDate}</span>
            <span className="bg">{formattedDate}</span>
          </button>
        );
        day = dateFns.addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="calendar-body">{rows}</div>;
  }

  renderDays() {
    const { currentMonth } = this.state;
    const dateFormat = "dddd";
    const days = [];

    const startDate = dateFns.startOfWeek(currentMonth);

    for (let i = 0; i < 7; i += 1) {
      days.push(
        <div className="col col-center" key={i}>
          {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
        </div>
      );
    }

    return <div className="days row">{days}</div>;
  }

  renderHeader() {
    const dateFormat = "MMMM YYYY";
    const { currentMonth } = this.state;
    return (
      <header className="header row flex-middle">
        <div className="col col-start">
          <button className="btn-icon" onClick={this.prevMonth} type="button">
            <ChevronLeft />
          </button>
        </div>
        <div className="col col-center">
          <span>{dateFns.format(currentMonth, dateFormat)}</span>
        </div>
        <div className="col col-end">
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

export default Calendar;
