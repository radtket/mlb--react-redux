import React from "react";
import PropTypes from "prop-types";
import { ChevronLeft, ChevronRight } from "../Icons";

const CalendarHeader = ({ prevMonth, nextMonth, currentMonthHeadline }) => {
  return (
    <header className="calendar__header calendar__row aligner__center--vertical">
      <div className="calendar__col aligner__center--start text-left">
        <button className="btn-icon" onClick={prevMonth} type="button">
          <ChevronLeft />
        </button>
      </div>
      <div className="calendar__col aligner__center--horitzontal text-center">
        <h5 className="text-uppercase text-bold">{currentMonthHeadline}</h5>
      </div>
      <div className="calendar__col aligner__center--end text-right">
        <button className="btn-icon" onClick={nextMonth} type="button">
          <ChevronRight />
        </button>
      </div>
    </header>
  );
};

CalendarHeader.propTypes = {
  prevMonth: PropTypes.func.isRequired,
  nextMonth: PropTypes.func.isRequired,
  currentMonthHeadline: PropTypes.string.isRequired,
};

export default CalendarHeader;
