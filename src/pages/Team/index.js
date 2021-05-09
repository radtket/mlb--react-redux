import React from "react";
import PropTypes from "prop-types";
import { Route, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import TeamHeader from "../../components/Team/TeamHeader";
import {
  PageTeamDepth,
  PageTeamHome,
  PageTeamRoster,
  PageTeamSchedule,
  PageTeamSplits,
  PageTeamStats,
  PageTeamTickets,
} from "./sub-pages";
import TeamTheme from "./TeamTheme";
import LoadingSpinner from "../../components/LoadingSpinner";
import ErrorMessage from "../../components/ErrorMessage";

const Team = ({ teams, history, schedules }) => {
  const { teamAbrv } = useParams();
  const {
    activeTeamObj,
    recentGames,
    standings,
    standingsError,
    standingsLoading,
  } = useSelector(state => ({
    ...state.standings,
    activeTeamObj: teams.find(team => team.Key === teamAbrv),
    recentGames: schedules
      .filter(
        ({ HomeTeam, AwayTeam }) =>
          HomeTeam === teamAbrv || AwayTeam === teamAbrv
      )
      .reverse(),
  }));

  if (standingsError) {
    return <ErrorMessage error={standingsError} />;
  }

  if (standingsLoading || !activeTeamObj) {
    return <LoadingSpinner />;
  }

  return (
    <TeamTheme {...activeTeamObj}>
      <TeamHeader
        {...{ ...activeTeamObj, teams }}
        changeTeams={e => {
          history.push(`/teams/${e.value}`);
        }}
      />
      <Route
        exact
        path="/teams/:teamAbrv"
        render={() => (
          <PageTeamHome {...{ activeTeamObj, recentGames, standings }} />
        )}
      />
      <Route component={PageTeamRoster} exact path="/teams/:teamAbrv/roster" />
      <Route component={PageTeamStats} exact path="/teams/:teamAbrv/stats" />
      <Route component={PageTeamDepth} exact path="/teams/:teamAbrv/depth" />
      <Route
        exact
        path="/teams/:teamAbrv/schedule"
        render={() => (
          <PageTeamSchedule currentTeamAbrv={teamAbrv} schedule={recentGames} />
        )}
      />
      <Route
        exact
        path="/teams/:teamAbrv/tickets"
        render={() => <PageTeamTickets {...activeTeamObj} />}
      />
      <Route
        exact
        path="/teams/:teamAbrv/splits"
        render={() => <PageTeamSplits {...activeTeamObj} />}
      />
    </TeamTheme>
  );
};

Team.propTypes = {
  teams: PropTypes.arrayOf(PropTypes.object).isRequired,
  schedules: PropTypes.arrayOf(
    PropTypes.shape({
      Status: PropTypes.string,
      AwayTeam: PropTypes.string,
      HomeTeam: PropTypes.string,
    })
  ).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Team;
