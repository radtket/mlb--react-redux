import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchLeagueLeaders } from "../modules/actions";
import LoadingSpinner from "../components/LoadingSpinner";

const LeagueLeadersList = ({
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

  console.log(leagueLeaders && leagueLeaders);

  return (
    <ul>
      <li>Hi</li>
      {/* {leagueLeaders &&
        leagueLeaders.map(item => <li key={item.Key}>{item.Name}</li>)} */}
    </ul>
  );
};

LeagueLeadersList.propTypes = {
  leagueLeadersFail: null || PropTypes.bool,
  leagueLeadersLoading: PropTypes.bool.isRequired,
  leagueLeaders: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchLeagueLeaders: PropTypes.func.isRequired,
};

LeagueLeadersList.defaultProps = {
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
)(LeagueLeadersList);
