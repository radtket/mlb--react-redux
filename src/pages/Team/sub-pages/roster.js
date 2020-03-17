import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import TeamRoster from "../../../components/Team/TeamRoster";
import { fetchTeamRoster } from "../../../modules/actions";
import LoadingSpinner from "../../../components/LoadingSpinner";

const PageTeamRoster = () => {
  const { teamAbrv } = useParams();
  const dispatch = useDispatch();

  const { teamRoster, teamRosterLoading, teamRosterError } = useSelector(
    state => state.teamRoster
  );

  useEffect(() => {
    dispatch(fetchTeamRoster(teamAbrv));
  }, [dispatch, teamAbrv]);

  if (teamRosterError) {
    return <div>Error! {teamRosterError.message}</div>;
  }

  if (teamRosterLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-12">
          <TeamRoster {...{ teamRoster, teamRosterError, teamRosterLoading }} />
        </div>
      </div>
    </div>
  );
};

export default PageTeamRoster;
