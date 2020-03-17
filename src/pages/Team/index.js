import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Route, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchStandings } from "../../modules/actions";
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

const Team = ({
  standings,
  standingsError,
  standingsLoading,
  teams,
  history,
  schedules,
}) => {
  const { teamAbrv } = useParams();
  const [recentGames, setRecentGames] = useState([]);
  useEffect(() => {
    const findTeamSchedule = () => {
      return schedules
        .filter(({ HomeTeam, AwayTeam }) => {
          return HomeTeam === teamAbrv || AwayTeam === teamAbrv;
        })
        .reverse();
    };
    setRecentGames(findTeamSchedule());
  }, [schedules, teamAbrv]);

  const activeTeamObj = teams.find(team => team.Key === teamAbrv);

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
  standingsError: PropTypes.bool,
  standingsLoading: PropTypes.bool.isRequired,
  standings: PropTypes.arrayOf(PropTypes.object).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

Team.defaultProps = {
  standingsError: null,
};

const mapStateToProps = ({ standings }) => ({
  standings: standings.standings,
  standingsLoading: standings.standingsLoading,
  standingsError: standings.standingsError,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchStandings,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(Team);
