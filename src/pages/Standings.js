import React from "react";
import { useSelector } from "react-redux";
import StandingsSingleTeam from "../components/Standings/SingleTeamComponent";
import StandingsDivision from "../components/Standings/DivisionComponent";
import { sortTeamsByDivion } from "../utils/helpers";
import LoadingSpinner from "../components/LoadingSpinner";
import PageTitle from "../components/PageTitle";
import ErrorMessage from "../components/ErrorMessage";

const StandingsList = () => {
  const { standings, standingsError, standingsLoading } = useSelector(
    state => state.standings
  );

  if (standingsError) {
    return <ErrorMessage error={standingsError} />;
  }

  if (standingsLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container">
      <PageTitle title="Standings" />
      {standings &&
        sortTeamsByDivion(standings).map(([division, teams]) => {
          return (
            <StandingsDivision
              key={division}
              className="table"
              {...{
                division,
                divisionTeams: teams.map(team => {
                  return <StandingsSingleTeam key={team.Key} {...team} />;
                }),
              }}
            />
          );
        })}
    </div>
  );
};

export default StandingsList;
