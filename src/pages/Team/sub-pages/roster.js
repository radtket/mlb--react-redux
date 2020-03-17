import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import TeamRoster from "../../../components/Team/TeamRoster";
import { fetchTeamRoster } from "../../../modules/actions";
import LoadingSpinner from "../../../components/LoadingSpinner";

const PageTeamRoster = ({
  match: {
    params: { teamAbrv },
  },
}) => {
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

PageTeamRoster.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      teamAbrv: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default PageTeamRoster;
