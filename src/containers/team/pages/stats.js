import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchTeamStats } from "../../../modules/teamStats/actions";
import StatsPlayerTable from "../../../components/StatsTable";

class PageTeamStats extends Component {
  componentDidMount() {
    const { match, fetchTeamStats: getTeamStats } = this.props;
    const { teamAbrv: currentTeamAbrv } = match.params;
    getTeamStats(currentTeamAbrv);
  }

  splitStatsByPosition = stats => {
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

  render() {
    const { teamStatsFail, teamStatsLoading, teamStats } = this.props;

    if (teamStatsFail) {
      return <div>Error! {teamStatsFail.message}</div>;
    }

    if (teamStatsLoading) {
      return <div>Loading...</div>;
    }

    // console.log(this.splitStatsByPosition(teamStats));

    // console.log(teamStats);

    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <div className="card" style={{ position: "relative" }}>
              <h5 className="card__headline">Batting Stats</h5>
              <StatsPlayerTable players={teamStats} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PageTeamStats.propTypes = {
  teamStatsFail: null || PropTypes.bool,
  teamStatsLoading: PropTypes.bool.isRequired,
  teamStats: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchTeamStats: PropTypes.func.isRequired,
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
