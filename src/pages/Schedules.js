/* eslint-disable no-console */
import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import dateFns from "date-fns";
import Slider from "react-slick";
import { fetchSchedules } from "../modules/actions";
import SingleGame from "../components/Standings/SingleGame";
import { TodaysDate, isArrayEmpty, isObjectEmpty } from "../utils/helpers";
import LoadingSpinner from "../components/LoadingSpinner";

import "../assets/scss/components/slick-theme.scss";

const SchedulesList = ({ schedulesError, schedulesLoading, schedules }) => {
  const slider = useRef();

  const [activeTab, setActiveTab] = useState(TodaysDate);
  const [activeGames, setActiveGames] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [startAndEndDay, setStartAndEndDay] = useState({});
  const [activeDisplayDate, setActiveDisplayDate] = useState(null);

  const getStartAndEndDays = () => {
    console.log("ran getStartAndEndDays");
    const firstDay = schedules[0] && schedules[0].Day;
    const lastDay =
      schedules[schedules.length - 1] && schedules[schedules.length - 1].Day;
    return {
      firstDay: dateFns.startOfWeek(firstDay),
      lastDay: dateFns.endOfWeek(lastDay),
    };
  };

  const buildEmptyCalender = startAndEndDayArg => {
    console.log("buildEmptyCalender");
    const { firstDay, lastDay } = startAndEndDayArg;
    let day = firstDay;
    const allDays = {};
    while (day <= lastDay) {
      for (let i = 0; i < 7; i += 1) {
        const formatedDate = dateFns.format(day, "YYYY-MM-DD");
        allDays[formatedDate] = allDays[formatedDate] || [];
        day = dateFns.addDays(day, 1);
      }
    }
    return allDays;
  };

  const buildGamesCalander = emptyCalender => {
    console.log("buildGamesCalander");
    return Object.entries(
      schedules.reduce((allDates, game) => {
        const Day = dateFns.format(new Date(game.Day), "YYYY-MM-DD");
        const allGames = allDates;
        allGames[Day] = allGames[Day] || [];
        allGames[Day].push(game);
        return allGames;
      }, emptyCalender)
    ).map(day => {
      const [GameDate, Games] = day;

      if (isArrayEmpty(Games)) {
        return (
          <div key={GameDate} label={GameDate}>
            <h1>No Games</h1>
          </div>
        );
      }

      return (
        <div key={GameDate} label={GameDate}>
          {Games.map(game => (
            <SingleGame key={game.GameID} {...game} />
          ))}
        </div>
      );
    });
  };

  const getInitalActiveIndex = () => {
    console.log("getInitalActiveIndex");
    return activeGames.findIndex(child => {
      const { label } = child.props;
      const activeDayStartOfWeek = dateFns.format(
        dateFns.startOfWeek(activeTab),
        "YYYY-MM-DD"
      );
      return activeDayStartOfWeek === label;
    });
  };

  useEffect(() => {
    console.log("ran useEffect");
    isObjectEmpty(startAndEndDay) && setStartAndEndDay(getStartAndEndDays());
    isArrayEmpty(activeGames) &&
      !isObjectEmpty(startAndEndDay) &&
      setActiveGames(buildGamesCalander(buildEmptyCalender(startAndEndDay)));

    !isArrayEmpty(activeGames) &&
      !isObjectEmpty(startAndEndDay) &&
      activeIndex === null &&
      setActiveIndex(getInitalActiveIndex());
    !isArrayEmpty(activeGames) &&
      !isObjectEmpty(startAndEndDay) &&
      activeDisplayDate === null &&
      activeIndex &&
      setActiveDisplayDate(activeIndex);
  });

  const buildNav = () => {
    console.log("buildNav");
    return activeGames.map(child => {
      const { label } = child.props;

      return (
        <button
          key={label}
          className={`tabs-item ${activeTab === label ? "is-selected" : ""}`}
          onClick={() => setActiveTab(label)}
          type="button">
          {label}
        </button>
      );
    });
  };

  const buildBody = () => {
    console.log("buildBody");
    return activeGames.map(child => {
      const { children: kids, label } = child.props;
      if (label !== activeTab) {
        return undefined;
      }
      return kids;
    });
  };

  const renderVisibleStartAndStopDays = dayIndex => {
    const day = activeGames[dayIndex] && activeGames[dayIndex].key;
    const weekStart = dateFns.format(dateFns.startOfWeek(day), "YYYY-MM-DD");
    const weekEnd = dateFns.format(dateFns.endOfWeek(day), "YYYY-MM-DD");
    return `${weekStart} - ${weekEnd}`;
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
        <h1>{renderVisibleStartAndStopDays(activeDisplayDate)}</h1>
        <Slider
          ref={slider}
          {...{
            dots: true,
            infinite: false,
            speed: 500,
            slidesToShow: 7,
            slidesToScroll: 7,
            arrows: true,
            initialSlide: activeIndex,
            afterChange: current => setActiveDisplayDate(current),
          }}>
          {buildNav()}
        </Slider>
        <div className="tab-content">{buildBody()}</div>
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
