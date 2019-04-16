/* eslint-disable camelcase */
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { fetchLeagueLeaders } from "../modules/actions";
import LoadingSpinner from "../components/LoadingSpinner";
import LeagueLeaderTable from "../components/LeagueLeaderTable";

const LeagueLeadersTeams = ({
  leagueLeadersFail,
  leagueLeadersLoading,
  leagueLeaders,
  fetchLeagueLeaders: getLeagueLeaders,
}) => {
  useEffect(() => {
    getLeagueLeaders();
  }, []);
  if (leagueLeadersFail) {
    return <div>Error! {leagueLeadersFail.message}</div>;
  }

  if (leagueLeadersLoading) {
    return <LoadingSpinner />;
  }

  const { pitching, hitting } = leagueLeaders;

  return (
    <div className="container">
      <div className="row">
        <h1>Batting Stats</h1>
        {hitting && <LeagueLeaderTable dataObj={hitting} />}
      </div>

      <div className="row">
        <h1>Pitching Stats</h1>
        {pitching && <LeagueLeaderTable dataObj={pitching} />}
      </div>
    </div>
  );
};

LeagueLeadersTeams.propTypes = {
  leagueLeadersFail: null || PropTypes.bool,
  leagueLeadersLoading: PropTypes.bool.isRequired,
  leagueLeaders: PropTypes.objectOf(PropTypes.object).isRequired,
  fetchLeagueLeaders: PropTypes.func.isRequired,
};

LeagueLeadersTeams.defaultProps = {
  leagueLeadersFail: null,
};

const mapStateToProps = ({ leagueLeaders }) => ({
  leagueLeaders: leagueLeaders.leagueLeadersData,
  leagueLeadersLoading: leagueLeaders.leagueLeadersLoading,
  leagueLeadersFail: leagueLeaders.leagueLeadersError,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchLeagueLeaders,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { pure: false }
)(LeagueLeadersTeams);
