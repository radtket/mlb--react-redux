import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchTeamDepths, fetchTeamRoster } from "../../../modules/actions";
import DepthChart from "../../../components/DepthChart";

const PageTeamDepth = ({
  fetchTeamDepths: getTeamDepths,
  fetchTeamRoster: getTeamRoster,
  teamDepthsFail,
  teamDepthsLoading,
  teamDepths,
  teamRoster,
  teamRosterError,
  teamRosterLoading,
  currentTeamAbrv,
  PrimaryColor,
  QuaternaryColor,
  SecondaryColor,
}) => {
  useEffect(() => {
    getTeamDepths(currentTeamAbrv);
    getTeamRoster(currentTeamAbrv);
  }, []);
  const { positions } = teamDepths;

  if (teamDepthsFail) {
    return <div>Error! {teamDepthsFail.message}</div>;
  }

  if (teamRosterError) {
    return <div>Error! {teamRosterError.message}</div>;
  }

  if (teamDepthsLoading || teamRosterLoading || !positions) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-12">
          <h1>PageTeamDepth</h1>
          <DepthChart
            TeamAbrv={currentTeamAbrv}
            positions={positions}
            teamRoster={teamRoster}
            PrimaryColor={PrimaryColor}
            QuaternaryColor={QuaternaryColor}
            SecondaryColor={SecondaryColor}
          />
        </div>
      </div>
    </div>
  );
};

PageTeamDepth.propTypes = {
  teamDepthsFail: null || PropTypes.bool,
  teamDepthsLoading: PropTypes.bool.isRequired,
  teamDepths: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.array])
  ).isRequired,
  fetchTeamDepths: PropTypes.func.isRequired,
  teamRosterError: null || PropTypes.bool,
  teamRosterLoading: PropTypes.bool.isRequired,
  teamRoster: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchTeamRoster: PropTypes.func.isRequired,
  currentTeamAbrv: PropTypes.string.isRequired,
  PrimaryColor: PropTypes.string,
  QuaternaryColor: PropTypes.string,
  SecondaryColor: PropTypes.string,
};

PageTeamDepth.defaultProps = {
  teamDepthsFail: null,
  teamRosterError: null,
  PrimaryColor: null,
  QuaternaryColor: null,
  SecondaryColor: null,
};

const mapStateToProps = ({ teamDepths, teamRoster }) => ({
  teamDepths: teamDepths.teamDepthsData,
  teamDepthsLoading: teamDepths.teamDepthsLoading,
  teamDepthsFail: teamDepths.teamDepthsError,
  teamRoster: teamRoster.teamRosterData,
  teamRosterLoading: teamRoster.teamRosterLoading,
  teamRosterError: teamRoster.teamRosterError,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchTeamDepths,
      fetchTeamRoster,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { pure: false }
)(PageTeamDepth);
