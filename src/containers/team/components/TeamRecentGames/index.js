import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import SingleGame from "./SingleGame";
import { DEV_PLACEHOLDER_DATE, TodaysDate } from "../../../../utils/helpers";

class TeamRecentGames extends Component {
  renderLast15Games = (data, beforeDate = TodaysDate) => {
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
      <>
        <h5>Recent Games</h5>
        <ul>
          {recentGames &&
            this.renderLast15Games(recentGames, DEV_PLACEHOLDER_DATE)}
        </ul>
      </>
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
