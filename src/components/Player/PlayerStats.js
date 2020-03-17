import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { fetchPlayerStats } from "../../modules/actions";
import LoadingSpinner from "../LoadingSpinner";
import AdvancedStats from "./AdvancedStats";
import BasicStats from "./BasicStats";
import Card from "../Card";
import ErrorMessage from "../ErrorMessage";

const PlayerStats = ({ RotoWirePlayerID, PositionCategory }) => {
  const dispatch = useDispatch();

  const { playerStatsData, playerStatsLoading, playerStatsError } = useSelector(
    state => state.playerStats
  );

  useEffect(() => {
    dispatch(fetchPlayerStats(RotoWirePlayerID, PositionCategory));
  }, [PositionCategory, RotoWirePlayerID, dispatch]);

  if (playerStatsError) {
    return <ErrorMessage error={playerStatsError} />;
  }

  if (playerStatsLoading) {
    return <LoadingSpinner />;
  }

  const { isPitcher, basic, advanced } = playerStatsData;

  return (
    <div>
      {basic && (
        <Card
          body={<BasicStats data={basic.body} {...{ isPitcher }} />}
          title={`${isPitcher ? "Pitching" : "Batting"} Stats`}
        />
      )}

      {advanced && (
        <Card
          body={<AdvancedStats data={advanced.body} {...{ isPitcher }} />}
          title={`Advanced ${isPitcher ? "Pitching" : "Batting"} Stats`}
        />
      )}
    </div>
  );
};

PlayerStats.propTypes = {
  RotoWirePlayerID: PropTypes.number,
  PositionCategory: PropTypes.string,
};

PlayerStats.defaultProps = {
  RotoWirePlayerID: null,
  PositionCategory: "",
};

export default PlayerStats;
