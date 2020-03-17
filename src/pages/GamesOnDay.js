import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addDays, subDays, format } from "date-fns";
import {
  fetchGamesOnDay,
  fetchAllPlayers,
  fetchStadiums,
  fetchTicketsOnDate,
} from "../modules/actions";
import LoadingSpinner from "../components/LoadingSpinner";
import {
  // TODO: Add When API is Live
  // TodaysDate,
  DEV_PLACEHOLDER_DATE,
} from "../utils/helpers";
import PageTitle from "../components/PageTitle";
import GamesOnDayList from "../components/GamesOnDayList";

const GamesOnDay = () => {
  const dispatch = useDispatch();

  const {
    allPlayersData,
    allPlayersError,
    allPlayersLoading,
    gamesOnDayData,
    gamesOnDayError,
    gamesOnDayLoading,
    stadiumsData,
    stadiumsError,
    stadiumsLoading,
    standings,
    standingsError,
    standingsLoading,
    ticketsData,
    ticketsError,
    ticketsLoading,
  } = useSelector(state => {
    return {
      ...state.allPlayers,
      ...state.gamesOnDay,
      ...state.standings,
      ...state.stadiums,
      ...state.tickets,
    };
  });
  const [dateOfGame, setDateOfGame] = useState(DEV_PLACEHOLDER_DATE);

  useEffect(() => {
    const getData = data => {
      dispatch(fetchGamesOnDay(data));
      dispatch(fetchAllPlayers());
      dispatch(fetchStadiums());
      dispatch(fetchTicketsOnDate(format(data, "YYYY-MM-DD")));
    };

    getData(dateOfGame);
  }, [dateOfGame, dispatch]);

  if (stadiumsError) {
    return <div>Error! {stadiumsError.message}</div>;
  }

  if (gamesOnDayError) {
    return <div>Error! {gamesOnDayError.message}</div>;
  }

  if (standingsError) {
    return <div>Error! {standingsError.message}</div>;
  }

  if (allPlayersError) {
    return <div>Error! {allPlayersError.message}</div>;
  }

  if (ticketsError) {
    return <div>Error! {ticketsError.message}</div>;
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
          <button
            onClick={() => {
              const newDay = subDays(new Date(dateOfGame), 1);
              setDateOfGame(newDay);
              dispatch(fetchGamesOnDay(newDay));
              dispatch(fetchTicketsOnDate(format(newDay, "YYYY-MM-DD")));
            }}
            type="button"
          >
            Previous
          </button>
          <button
            onClick={() => {
              const newDay = addDays(new Date(dateOfGame), 1);
              setDateOfGame(newDay);
              dispatch(fetchGamesOnDay(newDay));
              dispatch(fetchTicketsOnDate(format(newDay, "YYYY-MM-DD")));
            }}
            type="button"
          >
            Next
          </button>
        </nav>
        <GamesOnDayList
          {...{
            gamesOnDay: gamesOnDayData,
            allPlayers: allPlayersData,
            tickets: ticketsData,
            stadiums: stadiumsData,
            standings,
          }}
        />
      </div>
    </>
  );
};

export default GamesOnDay;
