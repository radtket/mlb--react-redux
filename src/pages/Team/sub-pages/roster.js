import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import TeamRoster from "../../../components/Team/TeamRoster";
import { fetchTeamRoster } from "../../../modules/actions";
import LoadingSpinner from "../../../components/LoadingSpinner";

const PageTeamRoster = ({
  teamRoster,
  teamRosterError,
  teamRosterLoading,
  match,
  fetchTeamRoster: getTeamRoster,
}) => {
  useEffect(() => {
    const { teamAbrv: currentTeamAbrv } = match.params;
    getTeamRoster(currentTeamAbrv);
  }, []);

  if (teamRosterError) {
    return <div>Error! {teamRosterError.message}</div>;
  }

  if (teamRosterLoading) {
    return <LoadingSpinner />;
  }

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
};

PageTeamRoster.propTypes = {
  teamRosterError: null || PropTypes.bool,
  teamRosterLoading: PropTypes.bool.isRequired,
  teamRoster: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchTeamRoster: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      teamAbrv: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

PageTeamRoster.defaultProps = {
  teamRosterError: null,
};

const mapStateToProps = ({ teamRoster }) => ({
  teamRoster: teamRoster.teamRosterData,
  teamRosterLoading: teamRoster.teamRosterLoading,
  teamRosterError: teamRoster.teamRosterError,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchTeamRoster,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { pure: false }
)(PageTeamRoster);
