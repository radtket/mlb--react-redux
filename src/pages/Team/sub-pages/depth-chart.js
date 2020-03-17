import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchTeamDepths, fetchTeamRoster } from "../../../modules/actions";
import DepthChart from "../../../components/DepthChart";
import LoadingSpinner from "../../../components/LoadingSpinner";

const PageTeamDepth = ({
  fetchTeamDepths: getTeamDepths,
  fetchTeamRoster: getTeamRoster,
  teamDepths: { positions },
  teamDepthsFail,
  teamDepthsLoading,
  teamRoster,
  teamRosterError,
  teamRosterLoading,
}) => {
  const { teamAbrv } = useParams();
  useEffect(() => {
    const mount = teamKey => {
      getTeamDepths(teamKey);
      getTeamRoster(teamKey);
    };
    mount(teamAbrv);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamAbrv]);

  if (teamDepthsFail) {
    return <div>Error! {teamDepthsFail.message}</div>;
  }

  if (teamRosterError) {
    return <div>Error! {teamRosterError.message}</div>;
  }

  if (teamDepthsLoading || teamRosterLoading || !positions) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-12">
          <h1>PageTeamDepth</h1>
          <DepthChart {...{ positions, teamRoster, teamAbrv }} />
        </div>
      </div>
    </div>
  );
};

PageTeamDepth.propTypes = {
  teamDepthsFail: PropTypes.bool,
  teamDepthsLoading: PropTypes.bool.isRequired,
  teamDepths: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.array])
  ).isRequired,
  fetchTeamDepths: PropTypes.func.isRequired,
  teamRosterError: PropTypes.bool,
  teamRosterLoading: PropTypes.bool.isRequired,
  teamRoster: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchTeamRoster: PropTypes.func.isRequired,
};

PageTeamDepth.defaultProps = {
  teamDepthsFail: null,
  teamRosterError: null,
};

const mapStateToProps = ({ teamDepths, teamRoster }) => ({
  teamDepths: teamDepths.teamDepthsData,
  teamDepthsLoading: teamDepths.teamDepthsLoading,
  teamDepthsFail: teamDepths.teamDepthsError,
  teamRoster: teamRoster.teamRoster,
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

export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(PageTeamDepth);
