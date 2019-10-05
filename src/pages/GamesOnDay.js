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
  fetchStadiums,
  fetchTicketsOnDate,
} from "../modules/actions";
import LoadingSpinner from "../components/LoadingSpinner";
import {
  // TODO: Add When API is Live
  // TodaysDate,
  DEV_PLACEHOLDER_DATE,
  teamFinder,
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
  stadiumsFail,
  stadiumsLoading,
  stadiums,
  fetchStadiums: getStadiums,
  ticketsFail,
  ticketsLoading,
  tickets,
  fetchTicketsOnDate: getTicketsOnDate,
}) => {
  const [dateOfGame, setdateOfGame] = useState(DEV_PLACEHOLDER_DATE);

  useEffect(() => {
    getGamesOnDay(dateOfGame);
    getAllPlayers();
    getStadiums();
    getTicketsOnDate(format(dateOfGame, "YYYY-MM-DD"));
  }, []);

  const previousDaysGame = date => {
    const newDay = subDays(new Date(date), 1);
    setdateOfGame(newDay);
    getGamesOnDay(newDay);
    getTicketsOnDate(format(newDay, "YYYY-MM-DD"));
  };

  const nextDaysGame = date => {
    const newDay = addDays(new Date(date), 1);
    setdateOfGame(newDay);
    getGamesOnDay(newDay);
    getTicketsOnDate(format(newDay, "YYYY-MM-DD"));
  };

  if (stadiumsFail) {
    return <div>Error! {stadiumsFail.message}</div>;
  }

  if (gamesOnDayFail) {
    return <div>Error! {gamesOnDayFail.message}</div>;
  }

  if (standingsError) {
    return <div>Error! {standingsError.message}</div>;
  }

  if (allPlayersFail) {
    return <div>Error! {allPlayersFail.message}</div>;
  }

  if (ticketsFail) {
    return <div>Error! {ticketsFail.message}</div>;
  }

  if (
    gamesOnDayLoading ||
    standingsLoading ||
    allPlayersLoading ||
    stadiumsLoading ||
    ticketsLoading
  ) {
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
            gamesOnDay.map(game => {
              return (
                <SingleGame
                  key={game.GameID}
                  allPlayers={allPlayers}
                  gameTicket={tickets.find(ticket =>
                    ticket.short_title.includes(
                      teamFinder[game.HomeTeam].Name ||
                        teamFinder[game.AwayTeam].Name
                    )
                  )}
                  stadiums={stadiums}
                  standings={standings}
                  {...game}
                />
              );
            })}
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
  stadiumsFail: null || PropTypes.bool,
  stadiumsLoading: PropTypes.bool.isRequired,
  stadiums: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchStadiums: PropTypes.func.isRequired,
  ticketsFail: null || PropTypes.bool,
  ticketsLoading: PropTypes.bool.isRequired,
  tickets: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchTicketsOnDate: PropTypes.func.isRequired,
};

GamesOnDayList.defaultProps = {
  allPlayersFail: null,
  gamesOnDayFail: null,
  standingsError: null,
  stadiumsFail: null,
  ticketsFail: null,
};

const mapStateToProps = ({
  allPlayers,
  gamesOnDay,
  standings,
  stadiums,
  tickets,
}) => ({
  allPlayers: allPlayers.allPlayersData,
  allPlayersLoading: allPlayers.allPlayersLoading,
  allPlayersFail: allPlayers.allPlayersError,
  gamesOnDay: gamesOnDay.gamesOnDayData,
  gamesOnDayLoading: gamesOnDay.gamesOnDayLoading,
  gamesOnDayFail: gamesOnDay.gamesOnDayError,
  standings: standings.standings,
  standingsLoading: standings.standingsLoading,
  standingsError: standings.standingsError,
  stadiums: stadiums.stadiumsData,
  stadiumsLoading: stadiums.stadiumsLoading,
  stadiumsFail: stadiums.stadiumsError,
  tickets: tickets.ticketsData,
  ticketsLoading: tickets.ticketsLoading,
  ticketsFail: tickets.ticketsError,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchAllPlayers,
      fetchGamesOnDay,
      fetchStandings,
      fetchStadiums,
      fetchTicketsOnDate,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { pure: false }
)(GamesOnDayList);
