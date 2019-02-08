import React, { Component } from "react";
import PropTypes from "prop-types";

class TeamRoster extends Component {
  render() {
    const { error, loading, teamRoster } = this.props;

    if (error) {
      return <div>Error! {error.message}</div>;
    }

    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <h1>Team Roster</h1>
        {teamRoster.map(player => (
          <li key={player.PlayerID}>{`${player.FirstName} ${
            player.LastName
          }`}</li>
        ))}
      </div>
    );
  }
}

TeamRoster.propTypes = {
  error: null || PropTypes.bool,
  loading: PropTypes.bool.isRequired,
  teamRoster: PropTypes.arrayOf(PropTypes.object).isRequired
};

TeamRoster.defaultProps = {
  error: null
};

export default TeamRoster;
