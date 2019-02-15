import React, { Component } from "react";
import PropTypes from "prop-types";

class TeamRecentGames extends Component {
  componentDidUpdate(prevProps) {
    const { activeTeam: previousActiveTeam } = prevProps;
    const { activeTeam: currentActiveTeam } = this.props;
    if (currentActiveTeam !== previousActiveTeam) {
      console.log("refresh");
    }
  }

  render() {
    const { recentGames } = this.props;
    return (
      <div>
        <h1>TeamRecentGames</h1>
        {recentGames &&
          recentGames.map(game => (
            <h4 key={game.GameID}>
              {game.AwayTeam} vs {game.HomeTeam}
            </h4>
          ))}
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
      HomeTeam: PropTypes.string
    })
  ).isRequired
};

export default TeamRecentGames;
