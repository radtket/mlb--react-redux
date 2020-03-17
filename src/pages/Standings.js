import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchStandings } from "../modules/actions";
import StandingsSingleTeam from "../components/Standings/SingleTeamComponent";
import StandingsDivision from "../components/Standings/DivisionComponent";
import { sortTeamsByDivion } from "../utils/helpers";
import LoadingSpinner from "../components/LoadingSpinner";
import PageTitle from "../components/PageTitle";
import ErrorMessage from "../components/ErrorMessage";

const StandingsList = ({ standings, standingsError, standingsLoading }) => {
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
        sortTeamsByDivion(standings).reduce(
          (standingsComponent, [division, divisionTeamsComponents]) => {
            standingsComponent.push(
              <StandingsDivision
                key={division}
                className="table"
                division={division}
                divisionTeams={divisionTeamsComponents.map(team => {
                  return <StandingsSingleTeam key={team.Key} {...team} />;
                })}
              />
            );
            return standingsComponent;
          },
          []
        )}
    </div>
  );
};

StandingsList.propTypes = {
  standingsError: PropTypes.bool,
  standingsLoading: PropTypes.bool.isRequired,
  standings: PropTypes.arrayOf(PropTypes.object).isRequired,
};

StandingsList.defaultProps = {
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
})(StandingsList);
