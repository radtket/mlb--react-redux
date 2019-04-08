import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchTeamStats } from "../../../modules/teamStats/actions";

import Tabs from "../../../components/Tabs/Tabs";
import StatsTableBatting from "../../../components/Team/StatsTables/Batting";
import StatsTablePitching from "../../../components/Team/StatsTables/Pitching";

const PageTeamStats = ({
  teamStatsFail,
  teamStatsLoading,
  teamStats,
  match,
  fetchTeamStats: getTeamStats,
}) => {
  useEffect(() => {
    const { teamAbrv: currentTeamAbrv } = match.params;
    getTeamStats(currentTeamAbrv);
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
    return <div>Loading...</div>;
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
  teamStatsFail: null || PropTypes.bool,
  teamStatsLoading: PropTypes.bool.isRequired,
  teamStats: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchTeamStats: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      teamAbrv: PropTypes.string.isRequired,
    }),
  }).isRequired,
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
)(PageTeamStats);
