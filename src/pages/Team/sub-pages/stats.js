import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchTeamStats } from "../../../modules/actions";
import LoadingSpinner from "../../../components/LoadingSpinner";

import Tabs from "../../../components/Tabs/Tabs";
import StatsTableBatting from "../../../components/Team/StatsTables/Batting";
import StatsTablePitching from "../../../components/Team/StatsTables/Pitching";
import ErrorMessage from "../../../components/ErrorMessage";

const PageTeamStats = () => {
  const { teamAbrv } = useParams();
  const dispatch = useDispatch();

  const { pitcher, batter, teamStatsLoading, teamStatsError } = useSelector(
    ({ teamStats }) => ({
      ...teamStats,
      ...teamStats.teamStatsData.reduce(
        (team, player) => {
          const { PositionCategory } = player;
          PositionCategory === "P"
            ? team.pitcher.push(player)
            : team.batter.push(player);

          return team;
        },
        { pitcher: [], batter: [] }
      ),
    })
  );

  useEffect(() => {
    dispatch(fetchTeamStats(teamAbrv));
  }, [dispatch, teamAbrv]);

  if (teamStatsError) {
    return <ErrorMessage error={teamStatsError} />;
  }

  if (teamStatsLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-12">
          <Tabs
            data={{
              Batting: <StatsTableBatting players={batter} />,
              Pitching: <StatsTablePitching players={pitcher} />,
            }}
            itemWidth="25%"
          >
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

export default PageTeamStats;
