/* eslint-disable camelcase */
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { fetchLeagueLeaders } from "../modules/actions";
import LoadingSpinner from "../components/LoadingSpinner";
import LeagueLeaderTable from "../components/LeagueLeaderTable";
import PageTitle from "../components/PageTitle";

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
        <div className="col-sm-12">
          <PageTitle title="Batting Stats" />
        </div>
      </div>

      <div className="wisbb--leaders__row">
        {hitting && <LeagueLeaderTable dataObj={hitting} />}
      </div>

      <div className="row">
        <div className="col-sm-12">
          <PageTitle title="Pitching Stats" />
        </div>
      </div>

      <div className="wisbb--leaders__row">
        {pitching && <LeagueLeaderTable dataObj={pitching} />}
      </div>
    </div>
  );
};

LeagueLeadersTeams.propTypes = {
  leagueLeadersFail: PropTypes.bool,
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
