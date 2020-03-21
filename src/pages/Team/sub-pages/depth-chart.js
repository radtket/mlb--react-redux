import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchTeamDepths, fetchTeamRoster } from "../../../modules/actions";
import DepthChart from "../../../components/DepthChart";
import LoadingSpinner from "../../../components/LoadingSpinner";
import ErrorMessage from "../../../components/ErrorMessage";

const PageTeamDepth = () => {
  const { teamAbrv } = useParams();
  const dispatch = useDispatch();

  const {
    teamDepthsData,
    teamDepthsLoading,
    teamDepthsError,
    teamRoster,
    teamRosterLoading,
    teamRosterError,
  } = useSelector(state => {
    return {
      ...state.teamDepths,
      ...state.teamRoster,
    };
  });

  useEffect(() => {
    dispatch(fetchTeamDepths(teamAbrv));
    dispatch(fetchTeamRoster(teamAbrv));
  }, [dispatch, teamAbrv]);

  if (teamDepthsError) {
    return <ErrorMessage error={teamDepthsError} />;
  }

  if (teamRosterError) {
    return <ErrorMessage error={teamRosterError} />;
  }

  if (teamDepthsLoading || teamRosterLoading || !teamDepthsData.positions) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-12">
          <h1>PageTeamDepth</h1>
          <DepthChart {...{ ...teamDepthsData, teamRoster, teamAbrv }} />
        </div>
      </div>
    </div>
  );
};

export default PageTeamDepth;
