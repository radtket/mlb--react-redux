import React, { Component } from "react";
import PropTypes from "prop-types";
import TeamRoster from "../components/TeamRoster";

class PageTeamRoster extends Component {
  render() {
    const { teamRoster, teamRosterError, teamRosterLoading } = this.props;
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <TeamRoster
              teamRoster={teamRoster}
              teamRosterError={teamRosterError}
              teamRosterLoading={teamRosterLoading}
            />
          </div>
        </div>
      </div>
    );
  }
}

PageTeamRoster.propTypes = {
  teamRosterError: null || PropTypes.bool,
  teamRosterLoading: PropTypes.bool.isRequired,
  teamRoster: PropTypes.arrayOf(PropTypes.object).isRequired,
};

PageTeamRoster.defaultProps = {
  teamRosterError: null,
};

export default PageTeamRoster;
