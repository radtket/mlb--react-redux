import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchLeagueLeaders } from "../modules/actions";
import LoadingSpinner from "../components/LoadingSpinner";
import LeagueLeaderTable from "../components/LeagueLeaderTable";
import PageTitle from "../components/PageTitle";

const LeagueLeadersTeams = () => {
  const dispatch = useDispatch();

  const {
    leagueLeadersData,
    leagueLeadersLoading,
    leagueLeadersError,
  } = useSelector(state => state.leagueLeaders);

  useEffect(() => {
    dispatch(fetchLeagueLeaders());
  }, [dispatch]);

  if (leagueLeadersError) {
    return <div>Error! {leagueLeadersError.message}</div>;
  }

  if (leagueLeadersLoading) {
    return <LoadingSpinner />;
  }

  const { pitching, hitting } = leagueLeadersData;

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-12">
          <PageTitle title="Batting Stats" />
        </div>
      </div>

      {hitting && (
        <div className="wisbb--leaders__row">
          <LeagueLeaderTable dataObj={hitting} />
        </div>
      )}

      <div className="row">
        <div className="col-sm-12">
          <PageTitle title="Pitching Stats" />
        </div>
      </div>

      {pitching && (
        <div className="wisbb--leaders__row">
          <LeagueLeaderTable dataObj={pitching} />
        </div>
      )}
    </div>
  );
};

export default LeagueLeadersTeams;
