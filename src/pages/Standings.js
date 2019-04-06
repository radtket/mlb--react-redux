import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchStandings } from "../modules/standings/actions";
import StandingsSingleTeam from "../components/Standings/SingleTeamComponent";
import StandingsDivision from "../components/Standings/DivisionComponent";
import { sortTeamsByDivion } from "../utils/helpers";

const StandingsList = ({ standings, standingsError, standingsLoading }) => {
  const createStandingsComponent = standingsArg => {
    return sortTeamsByDivion(standingsArg).reduce(
      (standingsComponent, divisionComponent) => {
        const [divisionName, divisionTeamsComponents] = divisionComponent;
        standingsComponent.push(
          <StandingsDivision
            className="table"
            key={divisionName}
            division={divisionName}
            divisionTeams={divisionTeamsComponents.map(team => {
              const { Key, League, Division } = team;
              return (
                <StandingsSingleTeam
                  key={Key}
                  division={`${League} ${Division}`}
                  team={team}
                />
              );
            })}
          />
        );
        return standingsComponent;
      },
      []
    );
  };

  if (standingsError) {
    return <div>Error! {standingsError.message}</div>;
  }

  if (standingsLoading || standings.length <= 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      {standings && createStandingsComponent(standings)}
    </div>
  );
};

StandingsList.propTypes = {
  standingsError: null || PropTypes.bool,
  standingsLoading: PropTypes.bool.isRequired,
  standings: PropTypes.arrayOf(PropTypes.object).isRequired,
};

StandingsList.defaultProps = {
  standingsError: null,
};

const mapStateToProps = ({ standings }) => ({
  standings: standings.standingsData,
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { pure: false }
)(StandingsList);
