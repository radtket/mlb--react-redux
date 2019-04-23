/* eslint-disable no-console */
import React from "react";
import { format } from "date-fns";
import SingleGame from "../Standings/SingleGame";
import { isArrayEmpty } from "../../utils/helpers";

const buildGamesCalander = (schedules, emptyCalender) => {
  console.log("buildGamesCalander");
  return Object.entries(
    schedules.reduce((allDates, game) => {
      const Day = format(new Date(game.Day), "YYYY-MM-DD");
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

buildGamesCalander.propTypes = {};

export default buildGamesCalander;
