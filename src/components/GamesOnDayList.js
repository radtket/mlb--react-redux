import React from "react";
import PropTypes from "prop-types";
import SingleGame from "./SingleGame";
import { teamFinder } from "../utils/helpers";

const GamesOnDayList = ({
  gamesOnDay,
  allPlayers,
  tickets,
  stadiums,
  standings,
}) => {
  return (
    <ul>
      {gamesOnDay.map(game => {
        const { HomeTeam, AwayTeam } = game;
        return (
          <SingleGame
            key={game.GameID}
            gameTicket={tickets.find(ticket =>
              ticket.short_title.includes(
                teamFinder[HomeTeam].Name || teamFinder[AwayTeam].Name
              )
            )}
            {...{ ...game, standings, stadiums, allPlayers }}
          />
        );
      })}
    </ul>
  );
};

GamesOnDayList.propTypes = {
  gamesOnDay: PropTypes.arrayOf(PropTypes.object).isRequired,
  allPlayers: PropTypes.arrayOf(PropTypes.object).isRequired,
  tickets: PropTypes.arrayOf(PropTypes.object).isRequired,
  stadiums: PropTypes.arrayOf(PropTypes.object).isRequired,
  standings: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default GamesOnDayList;
