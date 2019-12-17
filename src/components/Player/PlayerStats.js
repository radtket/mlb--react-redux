/* eslint-disable camelcase */
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchPlayerStats } from "../../modules/actions";
import LoadingSpinner from "../LoadingSpinner";
import { AdvancedStats, BasicStats } from ".";
import Card from "../Card";

const PlayerStats = ({
  playerStatsFail,
  playerStatsLoading,
  playerStats,
  RotoWirePlayerID,
  PositionCategory,
  fetchPlayerStats: getPlayerStats,
}) => {
  useEffect(() => {
    getPlayerStats(RotoWirePlayerID, PositionCategory);
  }, []);

  if (playerStatsFail) {
    return <div>Error! {playerStatsFail.message}</div>;
  }

  if (playerStatsLoading) {
    return <LoadingSpinner />;
  }

  const { isPitcher, basic, advanced } = playerStats;

  return (
    <div>
      {basic && (
        <Card
          body={<BasicStats data={basic.body} isPitcher={isPitcher} />}
          title={`${isPitcher ? "Pitching" : "Batting"} Stats`}
        />
      )}

      {advanced && (
        <Card
          body={<AdvancedStats data={advanced.body} isPitcher={isPitcher} />}
          title={`Advanced ${isPitcher ? "Pitching" : "Batting"} Stats`}
        />
      )}
    </div>
  );
};

PlayerStats.propTypes = {
  // data: PropTypes.arrayOf(PropTypes.object).isRequired,
  RotoWirePlayerID: PropTypes.number,
  PositionCategory: PropTypes.string,
  playerStatsFail: PropTypes.bool,
  playerStatsLoading: PropTypes.bool.isRequired,
  // playerStats: PropTypes.arrayOf(
  //   PropTypes.oneOfType(PropTypes.array, PropTypes.object)
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

export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(PlayerStats);
