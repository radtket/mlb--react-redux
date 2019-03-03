import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchTeamStats } from "../../../modules/teamStats/actions";

class PageTeamStats extends Component {
  componentDidMount() {
    const { match, fetchTeamStats: getTeamStats } = this.props;
    const { teamAbrv: currentTeamAbrv } = match.params;
    console.log("shitttt", currentTeamAbrv);

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
            <h1>PageTeamStats</h1>
            <table className="table table--responsive">
              <thead>
                <tr>
                  <th>NAME</th>
                  <th>GP</th>
                  <th>AB</th>
                  <th>R</th>
                  <th>H</th>
                  <th>2B</th>
                  <th>3B</th>
                  <th>HR</th>
                  <th>RBI</th>
                  <th>TB</th>
                  <th>BB</th>
                  <th>SO</th>
                  <th>SB</th>
                  <th>BA</th>
                  <th>OBP</th>
                  <th>SLG</th>
                  <th>OPS</th>
                </tr>
              </thead>
              <tbody>
                {teamStats &&
                  teamStats.map(player => {
                    const {
                      Name,
                      Games,
                      StatID,
                      PlayerID,
                      AtBats,
                      Runs,
                      Hits,
                      Doubles,
                      Triples,
                      HomeRuns,
                      RunsBattedIn,
                      TotalBases,
                      Walks,
                      Strikeouts,
                      StolenBases,
                      BattingAverage,
                      OnBasePercentage,
                      SluggingPercentage,
                      OnBasePlusSlugging,
                    } = player;
                    return (
                      <tr key={`${StatID} ${PlayerID}`}>
                        <td>{Name}</td>
                        <td>{Games}</td>
                        <td>{AtBats}</td>
                        <td>{Runs}</td>
                        <td>{Hits}</td>
                        <td>{Doubles}</td>
                        <td>{Triples}</td>
                        <td>{HomeRuns}</td>
                        <td>{RunsBattedIn}</td>
                        <td>{TotalBases}</td>
                        <td>{Walks}</td>
                        <td>{Strikeouts}</td>
                        <td>{StolenBases}</td>
                        <td>{BattingAverage}</td>
                        <td>{OnBasePercentage}</td>
                        <td>{SluggingPercentage}</td>
                        <td>{OnBasePlusSlugging}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
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
