import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchStandings } from "../../modules/standings/actions";
import StandingsSingleTeam from "./components/SingleTeamComponent";
import StandingsDivision from "./components/DivisionComponent";
import { espnLogo } from "../../utils/helpers";

class StandingsList extends Component {
  state = {
    standings: []
  };

  componentDidMount() {
    const { standings } = this.props;
    this.setState({
      standings: this.createStandingsComponent(standings)
    });
  }

  sortTeamsByDivion = allTeams => {
    return Object.entries(
      allTeams.reduce((teams, team) => {
        const { League, Division } = team;
        const teamsSortedByDivision = teams;
        teamsSortedByDivision[`${League} ${Division}`] =
          teamsSortedByDivision[`${League} ${Division}`] || [];
        teamsSortedByDivision[`${League} ${Division}`].push(team);
        return teamsSortedByDivision;
      }, {})
    );
  };

  createStandingsComponent = standings => {
    return this.sortTeamsByDivion(standings).reduce(
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
                  logo={espnLogo(`${Key}`, 24)}
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

  render() {
    const { standingsError, standingsLoading } = this.props;
    const { standings } = this.state;

    if (standingsError) {
      return <div>Error! {standingsError.message}</div>;
    }

    if (standingsLoading || standings.length <= 0) {
      return <div>Loading...</div>;
    }

    return <>{standings}</>;
  }
}

StandingsList.propTypes = {
  standingsError: null || PropTypes.bool,
  standingsLoading: PropTypes.bool.isRequired,
  standings: PropTypes.arrayOf(PropTypes.object).isRequired
};

StandingsList.defaultProps = {
  standingsError: null
};

const mapStateToProps = state => ({
  standings: state.standings.standingsData,
  standingsLoading: state.standings.standingsLoading,
  standingsError: state.standings.standingsError
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchStandings
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { pure: false }
)(StandingsList);
