import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import SingleGame from "./SingleGame";
import { DEV_PLACEHOLDER_DATE, TodaysDate } from "../../../../utils/helpers";

class TeamRecentGames extends Component {
  renderLast15Games = (data, activeTeam, beforeDate = TodaysDate) => {
    return data
      .filter(gameOnDay => {
        const { Day } = gameOnDay;
        return moment(Day).isBefore(beforeDate) && gameOnDay;
      })
      .map(game => {
        const { GameID } = game;
        return <SingleGame activeTeam={activeTeam} key={GameID} {...game} />;
      });
  };

  render() {
    const { activeTeam, recentGames } = this.props;
    return (
      <div className="card">
        <h5 className="card__headline">Recent Games</h5>
        <ul style={{ marginBottom: 0 }}>
          {recentGames &&
            this.renderLast15Games(
              recentGames,
              activeTeam,
              DEV_PLACEHOLDER_DATE
            )}
        </ul>
      </div>
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
