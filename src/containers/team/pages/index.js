import React, { Component } from "react";
import PropTypes from "prop-types";
import TeamRecentGames from "../components/TeamRecentGames";
import TeamStandings from "../components/TeamStandings";

class PageTeamHome extends Component {
  render() {
    const {
      activeTeamObj,
      currentTeamAbrv,
      recentGames,
      standings,
    } = this.props;

    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-8">
            <h1>Team Home</h1>
          </div>
          <div className="col-sm-4">
            <TeamStandings
              activeTeam={currentTeamAbrv}
              activeTeamObj={activeTeamObj}
              standings={standings}
            />
            <TeamRecentGames
              activeTeam={currentTeamAbrv}
              recentGames={recentGames}
            />
          </div>
        </div>
      </div>
    );
  }
}

PageTeamHome.propTypes = {
  activeTeamObj: PropTypes.shape({
    Name: PropTypes.string,
    City: PropTypes.string,
    Key: PropTypes.string,
    PrimaryColor: PropTypes.string,
  }).isRequired,
  recentGames: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentTeamAbrv: PropTypes.string.isRequired,
  standings: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PageTeamHome;
