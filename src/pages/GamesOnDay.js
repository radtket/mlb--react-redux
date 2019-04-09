/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addDays, subDays, format } from "date-fns";
import { fetchGamesOnDay } from "../modules/games-on-day/actions";
import { fetchStandings } from "../modules/standings/actions";
import {
  // TODO: Add When API is Live
  // TodaysDate,
  DEV_PLACEHOLDER_DATE,
} from "../utils/helpers";
import SingleGame from "../components/SingleGame";

const GamesOnDayList = ({
  gamesOnDayFail,
  gamesOnDayLoading,
  standingsError,
  gamesOnDay,
  standings,
  standingsLoading,
  fetchGamesOnDay: getGamesOnDay,
}) => {
  const [dateOfGame, setdateOfGame] = useState(DEV_PLACEHOLDER_DATE);

  useEffect(() => {
    getGamesOnDay(dateOfGame);
  }, []);

  const previousDaysGame = date => {
    const newDay = subDays(new Date(date), 1);
    setdateOfGame(newDay);
    getGamesOnDay(newDay);
  };

  const nextDaysGame = date => {
    const newDay = addDays(new Date(date), 1);
    setdateOfGame(newDay);
    getGamesOnDay(newDay);
  };

  if (gamesOnDayFail) {
    return <div>Error! {gamesOnDayFail.message}</div>;
  }
  if (standingsError) {
    return <div>Error! {standingsError.message}</div>;
  }

  if (gamesOnDayLoading || standingsLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Games For {format(new Date(dateOfGame), "dddd, MMMM Do YYYY")}</h1>
      <nav>
        <button onClick={() => previousDaysGame(dateOfGame)} type="button">
          Previous
        </button>
        <button onClick={() => nextDaysGame(dateOfGame)} type="button">
          Next
        </button>
      </nav>
      <ul>
        {gamesOnDay &&
          gamesOnDay.map(game => (
            <SingleGame key={game.GameID} standings={standings} {...game} />
          ))}
      </ul>
    </div>
  );
};

GamesOnDayList.propTypes = {
  gamesOnDayFail: null || PropTypes.bool,
  gamesOnDayLoading: PropTypes.bool.isRequired,
  gamesOnDay: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchGamesOnDay: PropTypes.func.isRequired,
  standingsError: null || PropTypes.bool,
  standingsLoading: PropTypes.bool.isRequired,
  standings: PropTypes.arrayOf(PropTypes.object).isRequired,
};

GamesOnDayList.defaultProps = {
  gamesOnDayFail: null,
  standingsError: null,
};

const mapStateToProps = ({ gamesOnDay, standings }) => ({
  gamesOnDay: gamesOnDay.gamesOnDayData,
  gamesOnDayLoading: gamesOnDay.gamesOnDayLoading,
  gamesOnDayFail: gamesOnDay.gamesOnDayError,
  standings: standings.standingsData,
  standingsLoading: standings.standingsLoading,
  standingsError: standings.standingsError,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchGamesOnDay,
      fetchStandings,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { pure: false }
)(GamesOnDayList);
