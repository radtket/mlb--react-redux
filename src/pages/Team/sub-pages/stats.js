import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { fetchTeamStats } from "../../../modules/actions";
import LoadingSpinner from "../../../components/LoadingSpinner";

import Tabs from "../../../components/Tabs/Tabs";
import StatsTableBatting from "../../../components/Team/StatsTables/Batting";
import StatsTablePitching from "../../../components/Team/StatsTables/Pitching";

const PageTeamStats = ({
  match: {
    params: { teamAbrv },
  },
}) => {
  const dispatch = useDispatch();

  const { teamStatsData, teamStatsLoading, teamStatsError } = useSelector(
    state => state.teamStats
  );

  useEffect(() => {
    dispatch(fetchTeamStats(teamAbrv));
  }, [dispatch, teamAbrv]);

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

  if (teamStatsError) {
    return <div>Error! {teamStatsError.message}</div>;
  }

  if (teamStatsLoading) {
    return <LoadingSpinner />;
  }

  const { pitcher, batter } = splitStatsByPosition(teamStatsData);

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
  match: PropTypes.shape({
    params: PropTypes.shape({
      teamAbrv: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default PageTeamStats;
