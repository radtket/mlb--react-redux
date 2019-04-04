import React, { Component } from "react";
import PropTypes from "prop-types";
import { isBefore } from "date-fns";
import SingleGame from "./SingleGame";
import { TodaysDate } from "../../../utils/helpers";
import Card from "../../Card";

class TeamRecentGames extends Component {
  renderLast15Games = (data, activeTeam, beforeDate = TodaysDate) => {
    return data
      .filter(gameOnDay => {
        const { Day } = gameOnDay;
        return isBefore(Day, beforeDate) && gameOnDay;
      })
      .map(game => {
        const { GameID } = game;
        return <SingleGame activeTeam={activeTeam} key={GameID} {...game} />;
      });
  };

  render() {
    const { activeTeam, recentGames } = this.props;
    return (
      <Card
        title="Recent Games"
        body={
          <ul style={{ marginBottom: 0 }}>
            {recentGames && this.renderLast15Games(recentGames, activeTeam)}
          </ul>
        }
      />
    );
  }
}

TeamRecentGames.propTypes = {
  activeTeam: PropTypes.string.isRequired,
  recentGames: PropTypes.arrayOf(
    PropTypes.shape({
      GameID: PropTypes.number,
      AwayTeam: PropTypes.string,
      HomeTeam: PropTypes.string,
    })
  ).isRequired,
};

export default TeamRecentGames;
