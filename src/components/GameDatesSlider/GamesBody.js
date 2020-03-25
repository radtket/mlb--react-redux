import React from "react";
import PropTypes from "prop-types";
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

const GamesBody = ({ dispayedGames }) => {
  if (isArrayEmpty(dispayedGames)) {
    return (
      <div>
        <h1>No Games</h1>
      </div>
    );
  }

  return (
    <div>
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
        <tbody>
          {dispayedGames.map(game => {
            return <SingleTableRowGame key={game.id} {...game} />;
          })}
        </tbody>
      </ScheduleTable>
    </div>
  );
};

GamesBody.propTypes = {
  dispayedGames: PropTypes.arrayOf(PropTypes.shape({})),
};

GamesBody.defaultProps = {
  dispayedGames: [],
};

export default GamesBody;
