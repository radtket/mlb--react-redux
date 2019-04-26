/* eslint-disable no-console */
import React from "react";
import { format } from "date-fns";
import styled from "styled-components";
import { isArrayEmpty } from "../../utils/helpers";
import SingleTableRowGame from "./SingleTableRowGame";

const ScheduleTable = styled.table`
  &.table--standings {
    td,
    th {
      text-align: left;
    }
  }
`;

const buildGamesCalander = (schedules, emptyCalender) => {
  console.log("buildGamesCalander");
  return Object.entries(
    schedules.reduce((allDates, game) => {
      // ! FantanySportsAPI = game.Day
      // ! SportsRadar = game.scheduled
      // const Day = format(new Date(game.Day), "YYYY-MM-DD");
      const Day = format(new Date(game.scheduled), "YYYY-MM-DD");
      const allGames = allDates;
      allGames[Day] = allGames[Day] || [];
      allGames[Day].push(game);
      return allGames;
    }, emptyCalender)
  ).map(day => {
    const [GameDate, Games] = day;
    console.log(day);

    if (isArrayEmpty(Games)) {
      return (
        <div key={GameDate} label={GameDate}>
          <h1>No Games</h1>
        </div>
      );
    }

    return (
      // ! FantanySportsAPI
      // {Games.map(game => (
      //   <SingleGame key={game.GameID} {...game} />
      // ))}

      <div key={GameDate} label={GameDate}>
        <ScheduleTable className="table table--striped table--standings">
          <thead>
            <tr>
              <th colSpan="3">Matchup</th>
              <th>Time (ET)</th>
              <th className="text-center">Network</th>
              <th>Venue</th>
              <th>Tickets</th>
            </tr>
          </thead>
          <tbody label={GameDate}>
            {Games.map(game => {
              return <SingleTableRowGame key={game.id} {...game} />;
            })}
          </tbody>
        </ScheduleTable>
      </div>
    );
  });
};

buildGamesCalander.propTypes = {};

export default buildGamesCalander;
