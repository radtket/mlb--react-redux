/* eslint-disable no-console */
import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { format } from "date-fns";
import Slider from "react-slick";
import { fetchSchedules } from "../modules/actions";
import { TodaysDate, isArrayEmpty, isObjectEmpty } from "../utils/helpers";
import LoadingSpinner from "../components/LoadingSpinner";

import {
  buildEmptyCalender,
  buildGamesCalander,
  GamesBody,
  getInitalActiveIndex,
  getStartAndEndDays,
  renderVisibleStartAndStopDays,
  SlickNextArrow,
  SlickPrevArrow,
} from "../components/GameDatesSlider";

const SchedulesList = ({ schedulesError, schedulesLoading, schedules }) => {
  const slider = useRef();

  const [activeDisplayDate, setActiveDisplayDate] = useState(null);
  const [activeGames, setActiveGames] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [activeTab, setActiveTab] = useState(TodaysDate);
  const [startAndEndDay, setStartAndEndDay] = useState({});

  useEffect(() => {
    console.log("ran useEffect");
    isObjectEmpty(startAndEndDay) &&
      setStartAndEndDay(getStartAndEndDays(schedules));

    isArrayEmpty(activeGames) &&
      !isObjectEmpty(startAndEndDay) &&
      !isArrayEmpty(schedules) &&
      setActiveGames(
        buildGamesCalander(schedules, buildEmptyCalender(startAndEndDay))
      );

    !isArrayEmpty(activeGames) &&
      !isObjectEmpty(startAndEndDay) &&
      activeIndex === null &&
      setActiveIndex(getInitalActiveIndex(activeGames, activeTab));

    !isArrayEmpty(activeGames) &&
      !isObjectEmpty(startAndEndDay) &&
      activeDisplayDate === null &&
      activeIndex &&
      setActiveDisplayDate(activeIndex);
  });

  const GamesNav = () => {
    console.log("GamesNav");
    return activeGames.map(child => {
      const { label } = child.props;

      return (
        <button
          key={label}
          className={`tabs-item ${activeTab === label ? "is-selected" : ""}`}
          onClick={() => setActiveTab(label)}
          type="button">
          <h3>{format(label, "MMM")}</h3>
          <h1>{format(label, "D")}</h1>
        </button>
      );
    });
  };

  if (schedulesError) {
    return <div>Error! {schedulesError.message}</div>;
  }

  if (
    schedulesLoading ||
    isObjectEmpty(startAndEndDay) ||
    isArrayEmpty(activeGames) ||
    activeIndex === null
  ) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <h1>Todays Games</h1>
      <div className="col-sm-7">
        <h1>{renderVisibleStartAndStopDays(activeGames, activeDisplayDate)}</h1>
        <Slider
          ref={slider}
          {...{
            infinite: false,
            speed: 500,
            slidesToShow: 7,
            slidesToScroll: 7,
            initialSlide: activeIndex,
            afterChange: current => setActiveDisplayDate(current),
            nextArrow: <SlickNextArrow />,
            prevArrow: <SlickPrevArrow />,
          }}>
          {GamesNav()}
        </Slider>
        <div className="tab-content">{GamesBody(activeGames, activeTab)}</div>
      </div>
    </div>
  );
};

SchedulesList.propTypes = {
  schedulesError: null || PropTypes.bool,
  schedulesLoading: PropTypes.bool.isRequired,
  schedules: PropTypes.arrayOf(PropTypes.object).isRequired,
};

SchedulesList.defaultProps = {
  schedulesError: null,
};

const mapStateToProps = ({ schedules }) => ({
  schedules: schedules.schedulesData,
  schedulesLoading: schedules.schedulesLoading,
  schedulesError: schedules.schedulesError,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchSchedules,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { pure: false }
)(SchedulesList);
