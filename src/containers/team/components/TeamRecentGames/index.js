import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import SingleGame from "./SingleGame";
import { DEV_PLACEHOLDER_DATE } from "../../../../utils/helpers";

class TeamRecentGames extends Component {
  renderLast15Games = (data, beforeDate = moment({}).format("YYYY-MM-DD")) => {
    return data
      .filter(gameOnDay => {
        const { Day } = gameOnDay;
        return moment(Day).isBefore(beforeDate) && gameOnDay;
      })
      .map(game => {
        const { GameID } = game;
        return <SingleGame key={GameID} {...game} />;
      });
  };

  render() {
    const { recentGames } = this.props;
    return (
      <div>
        <h1>TeamRecentGames</h1>
        <ul>
          {recentGames &&
            this.renderLast15Games(recentGames, DEV_PLACEHOLDER_DATE)}
        </ul>
      </div>
    );
  }
}

TeamRecentGames.propTypes = {
  recentGames: PropTypes.arrayOf(
    PropTypes.shape({
      GameID: PropTypes.number,
      AwayTeam: PropTypes.string,
      HomeTeam: PropTypes.string
    })
  ).isRequired
};

export default TeamRecentGames;
