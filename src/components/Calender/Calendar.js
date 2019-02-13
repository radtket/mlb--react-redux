import React, { Component } from "react";
import PropTypes from "prop-types";

import moment from "moment";
import Day from "./Day";
import DayOfWeek from "./DayOfWeek";
import Week from "./Week";

class Calendar extends Component {
  constructor(props) {
    super(props);
    const { date } = props;
    let month;
    if (date) {
      month = props.date;
    } else {
      month = props.month;
    }

    this.state = {
      date,
      month
    };

    this.previous = this.previous.bind(this);
    this.next = this.next.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount() {
    const { locale } = this.props;
    const { date, month } = this.state;
    moment.locale(locale);

    if (date) {
      date.locale(locale);
    }

    month.locale(locale);
  }

  componentWillUpdate(nextProps, nextState) {
    const { locale } = this.props;
    moment.locale(locale);

    if (nextState.date) {
      nextState.date.locale(locale);
    }

    nextState.month.locale(locale);
  }

  handleClick(date) {
    const flag = this.props.onSelect(date, this.state.date, this.state.month);

    if (flag === true) {
      this.setState({
        date: moment(date)
      });
    } else if (flag === false) {
      this.setState({
        date: null
      });
    }
  }

  previous() {
    const { month } = this.state;
    this.setState({
      month: moment(month).subtract(1, "month")
    });
  }

  next() {
    const { month } = this.state;
    this.setState({
      month: moment(month).add(1, "month")
    });
  }

  render() {
    const {
      startOfWeekIndex,
      dayRenderer,
      dayOfWeekFormat,
      className
    } = this.props;

    const classes = ["Calendar", className].join(" ");

    const today = moment();

    const format =
      dayOfWeekFormat &&
      dayOfWeekFormat !== "" &&
      moment(today, dayOfWeekFormat).isValid()
        ? dayOfWeekFormat
        : "dd";

    const { date, month } = this.state;

    const current = month
      .clone()
      .startOf("month")
      .day(startOfWeekIndex);
    if (current.date() > 1 && current.date() < 7) {
      current.subtract(7, "d");
    }

    const end = month
      .clone()
      .endOf("month")
      .day(7 + startOfWeekIndex);

    if (end.date() > 7) {
      end.subtract(7, "d");
    }

    const elements = [];
    let days = [];
    let week = 1;
    let i = 1;
    const daysOfWeek = [];
    const day = current.clone();

    for (let j = 0; j < 7; j += 1) {
      const dayOfWeekKey = `dayOfWeek${j}`;
      daysOfWeek.push(
        <DayOfWeek key={dayOfWeekKey} date={day.clone()} format={format} />
      );
      day.add(1, "days");
    }

    while (current.isBefore(end)) {
      let dayClasses = this.props.dayClasses(current);

      if (!current.isSame(month, "month")) {
        dayClasses = dayClasses.concat(["other-month"]);
      }

      const props = {
        date: current.clone(),
        selected: date,
        month,
        today,
        classes: dayClasses,
        handleClick: this.handleClick
      };

      let children;

      if (dayRenderer) {
        children = dayRenderer(props);
      }

      days.push(
        <Day key={(i += 1)} {...props}>
          {children}
        </Day>
      );
      current.add(1, "days");
      if (current.day() === startOfWeekIndex) {
        const weekKey = `week${(week += 1)}`;
        elements.push(<Week key={weekKey}>{days}</Week>);
        days = [];
      }
    }

    let nav;

    if (this.props.useNav) {
      nav = (
        <tr className="month-header">
          <th className="nav previous">
            <button className="nav-inner" onClick={this.previous} type="button">
              «
            </button>
          </th>
          <th colSpan="5">
            <span className="month"> {month.format("MMMM")} </span>
            <span className="year"> {month.format("YYYY")} </span>
          </th>
          <th className="nav next">
            <button className="nav-inner" onClick={this.next} type="button">
              »
            </button>
          </th>
        </tr>
      );
    } else {
      nav = (
        <tr className="month-header">
          <th colSpan="7">
            <span className="month">{month.format("MMMM")}</span>
            <span className="year">{month.format("YYYY")}</span>
          </th>
        </tr>
      );
    }

    return (
      <table className={classes}>
        <thead>{nav}</thead>
        <thead>
          <tr className="days-header">{daysOfWeek}</tr>
        </thead>
        <tbody>{elements}</tbody>
      </table>
    );
  }
}

Calendar.defaultProps = {
  month: moment(),
  dayClasses: () => [],
  useNav: true,
  locale: "en",
  startOfWeekIndex: 0,
  dayOfWeekFormat: "dd"
};

Calendar.propTypes = {
  onSelect: PropTypes.func.isRequired,
  date: PropTypes.object,
  month: PropTypes.object,
  dayClasses: PropTypes.func,
  useNav: PropTypes.bool,
  locale: PropTypes.string,
  startOfWeekIndex: PropTypes.number,
  dayRenderer: PropTypes.func,
  dayOfWeekFormat: PropTypes.string
};

export default Calendar;
