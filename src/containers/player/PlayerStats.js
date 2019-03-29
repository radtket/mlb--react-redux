/* eslint-disable camelcase */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchPlayerStats } from "../../modules/playerStats/actions";

import BasicStats from "./components/BasicStats";
import AdvancedStats from "./components/AdvancedStats";
import Card from "../../components/Card";

class PlayerStats extends Component {
  componentDidMount() {
    const {
      fetchPlayerStats: getPlayerStats,
      RotoWirePlayerID,
      PositionCategory,
    } = this.props;
    getPlayerStats(RotoWirePlayerID, PositionCategory);
  }

  render() {
    const { playerStatsFail, playerStatsLoading, playerStats } = this.props;

    if (playerStatsFail) {
      return <div>Error! {playerStatsFail.message}</div>;
    }

    if (playerStatsLoading) {
      return <div>Loading...</div>;
    }

    const { playerId, isPitcher, basic, advanced } = playerStats;

    return (
      <div>
        {basic && (
          <Card
            title={`${isPitcher ? "Pitching" : "Batting"} Stats`}
            body={
              <BasicStats
                data={basic.body}
                isPitcher={isPitcher}
                playerId={playerId}
              />
            }
          />
        )}

        {advanced && (
          <Card
            title={`Advanced ${isPitcher ? "Pitching" : "Batting"} Stats`}
            body={
              <AdvancedStats
                data={advanced.body}
                isPitcher={isPitcher}
                playerId={playerId}
              />
            }
          />
        )}
      </div>
    );
  }
}

PlayerStats.propTypes = {
  // data: PropTypes.arrayOf(PropTypes.object).isRequired,
  RotoWirePlayerID: PropTypes.number,
  PositionCategory: PropTypes.string,
  playerStatsFail: null || PropTypes.bool,
  playerStatsLoading: PropTypes.bool.isRequired,
  // playerStats: PropTypes.arrayOf(
  //   PropTypes.oneOfType(PropTypes.array, PropTypes.object)
  // ).isRequired,
  // playerStats: PropTypes.objectOf(
  //   PropTypes.oneOf([PropTypes.array, PropTypes.object,])
  // ).isRequired,
  playerStats: PropTypes.shape({
    isPitcher: PropTypes.bool,
    advanced: PropTypes.shape({
      body: PropTypes.array,
      footer: PropTypes.array,
    }),
    basic: PropTypes.shape({ body: PropTypes.array, footer: PropTypes.array }),
    defensive: PropTypes.arrayOf(PropTypes.object),
    gamelog: PropTypes.shape({
      majors: PropTypes.object,
      minors: PropTypes.object,
    }),
    gamesByPos: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  fetchPlayerStats: PropTypes.func.isRequired,
};

PlayerStats.defaultProps = {
  playerStatsFail: null,
  RotoWirePlayerID: null,
  PositionCategory: "",
};

const mapStateToProps = ({ playerStats }) => ({
  playerStats: playerStats.playerStatsData,
  playerStatsLoading: playerStats.playerStatsLoading,
  playerStatsFail: playerStats.playerStatsError,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchPlayerStats,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { pure: false }
)(PlayerStats);
