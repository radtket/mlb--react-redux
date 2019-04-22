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

const SchedulesList = ({ schedulesError, schedulesLoading, schedules }) => {
  const slider = useRef();
  const [activeTab, setActiveTab] = useState(TodaysDate);
  const [organizedGames, setOrganizedGames] = useState([]);
  const [startAndEndDay, setStartAndEndDay] = useState({});

  if (schedulesError) {
    return <div>Error! {schedulesError.message}</div>;
  }

  if (schedulesLoading) {
    return <LoadingSpinner />;
  }

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

  const buildSomethingElse = emptyCalender => {
    return Object.entries(
      schedules.reduce((allGames, game) => {
        const Day = dateFns.format(new Date(game.Day), "YYYY-MM-DD");
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

  // const buildIt = () => {
  //   return Object.entries(
  //     schedules.reduce((allGames, game) => {
  //       const Day = dateFns.format(new Date(game.Day), "YYYY-MM-DD");
  //       allGames[Day] = allGames[Day] || [];
  //       allGames[Day].push(game);
  //       return allGames;
  //     }, {})
  //   ).map(day => {
  //     const [GameDate, Games] = day;
  //     return (
  //       <div key={GameDate} label={GameDate}>
  //         {Games.map(game => (
  //           <SingleGame key={game.GameID} {...game} />
  //         ))}
  //       </div>
  //     );
  //   });
  // };

  useEffect(() => {
    console.log("ran useEffect");
    setStartAndEndDay(getStartAndEndDays());
    // setOrganizedGames(buildIt());
    setOrganizedGames(buildSomethingElse(buildEmptyCalender(startAndEndDay)));
  }, []);

  if (isArrayEmpty(organizedGames) || isObjectEmpty(startAndEndDay)) {
    return <h1>Loading</h1>;
  }

  console.log(buildSomethingElse(buildEmptyCalender(startAndEndDay)));

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 7,
    arrows: false,
  };

  return (
    <div>
      <h1>Todays Games</h1>

      <div className="tabs">
        <nav>
          {buildSomethingElse(buildEmptyCalender(startAndEndDay)).map(child => {
            const { label } = child.props;
            return (
              <button
                key={label}
                className={`tabs-item ${
                  activeTab === label ? "is-selected" : ""
                }`}
                onClick={() => setActiveTab(label)}
                type="button">
                {label}
              </button>
            );
          })}
        </nav>
        <div className="tab-content">
          {buildSomethingElse(buildEmptyCalender(startAndEndDay)).map(child => {
            const { children: kids, label } = child.props;
            if (label !== activeTab) return undefined;
            return kids;
          })}
        </div>
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
