/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addDays, subDays, format } from "date-fns";
import {
  fetchGamesOnDay,
  fetchStandings,
  fetchAllPlayers,
} from "../modules/actions";
import LoadingSpinner from "../components/LoadingSpinner";
import {
  // TODO: Add When API is Live
  // TodaysDate,
  DEV_PLACEHOLDER_DATE,
} from "../utils/helpers";
import SingleGame from "../components/SingleGame";
import PageTitle from "../components/PageTitle";

const GamesOnDayList = ({
  gamesOnDayFail,
  gamesOnDayLoading,
  standingsError,
  gamesOnDay,
  standings,
  standingsLoading,
  fetchGamesOnDay: getGamesOnDay,
  allPlayersFail,
  allPlayersLoading,
  allPlayers,
  fetchAllPlayers: getAllPlayers,
}) => {
  const [dateOfGame, setdateOfGame] = useState(DEV_PLACEHOLDER_DATE);

  useEffect(() => {
    getGamesOnDay(dateOfGame);
    getAllPlayers();
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

  if (allPlayersFail) {
    return <div>Error! {allPlayersFail.message}</div>;
  }

  if (gamesOnDayLoading || standingsLoading || allPlayersLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <div className="container">
        <PageTitle title="Scores" />
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
            allPlayers &&
            gamesOnDay.map(game => (
              <SingleGame
                key={game.GameID}
                standings={standings}
                allPlayers={allPlayers}
                {...game}
              />
            ))}
        </ul>
      </div>
    </>
  );
};

GamesOnDayList.propTypes = {
  allPlayersFail: null || PropTypes.bool,
  allPlayersLoading: PropTypes.bool.isRequired,
  allPlayers: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchAllPlayers: PropTypes.func.isRequired,
  gamesOnDayFail: null || PropTypes.bool,
  gamesOnDayLoading: PropTypes.bool.isRequired,
  gamesOnDay: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchGamesOnDay: PropTypes.func.isRequired,
  standingsError: null || PropTypes.bool,
  standingsLoading: PropTypes.bool.isRequired,
  standings: PropTypes.arrayOf(PropTypes.object).isRequired,
};

GamesOnDayList.defaultProps = {
  allPlayersFail: null,
  gamesOnDayFail: null,
  standingsError: null,
};

const mapStateToProps = ({ allPlayers, gamesOnDay, standings }) => ({
  allPlayers: allPlayers.allPlayersData,
  allPlayersLoading: allPlayers.allPlayersLoading,
  allPlayersFail: allPlayers.allPlayersError,
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
      fetchAllPlayers,
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
