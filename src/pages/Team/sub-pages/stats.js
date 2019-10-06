import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchTeamStats } from "../../../modules/actions";
import LoadingSpinner from "../../../components/LoadingSpinner";

import Tabs from "../../../components/Tabs/Tabs";
import StatsTableBatting from "../../../components/Team/StatsTables/Batting";
import StatsTablePitching from "../../../components/Team/StatsTables/Pitching";

const PageTeamStats = ({
  fetchTeamStats: getTeamStats,
  teamStats,
  teamStatsFail,
  teamStatsLoading,
  match: {
    params: { teamAbrv },
  },
}) => {
  useEffect(() => {
    getTeamStats(teamAbrv);
  }, []);

  const splitStatsByPosition = stats => {
    return stats.reduce(
      (team, player) => {
        const { PositionCategory } = player;
        PositionCategory === "P"
          ? team.pitcher.push(player)
          : team.batter.push(player);

        return team;
      },
      { pitcher: [], batter: [] }
    );
  };

  const { pitcher, batter } = splitStatsByPosition(teamStats);

  if (teamStatsFail) {
    return <div>Error! {teamStatsFail.message}</div>;
  }

  if (teamStatsLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-12">
          <Tabs itemWidth="25%">
            <div label="Batting">
              <StatsTableBatting players={batter} />
            </div>
            <div label="Pitching">
              <StatsTablePitching players={pitcher} />
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

PageTeamStats.propTypes = {
  teamStatsFail: PropTypes.bool,
  teamStatsLoading: PropTypes.bool.isRequired,
  teamStats: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchTeamStats: PropTypes.func.isRequired,
  currentTeamAbrv: PropTypes.string.isRequired,
};

PageTeamStats.defaultProps = {
  teamStatsFail: null,
};

const mapStateToProps = ({ teamStats }) => ({
  teamStats: teamStats.teamStatsData,
  teamStatsLoading: teamStats.teamStatsLoading,
  teamStatsFail: teamStats.teamStatsError,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchTeamStats,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { pure: false }
)(withRouter(PageTeamStats));
