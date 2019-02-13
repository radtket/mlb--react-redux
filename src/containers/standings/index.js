import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchStandings } from "../../modules/standings/actions";
import StandingsSingleTeam from "./components/SingleTeamComponent";
import StandingsDivision from "./components/DivisionComponent";
import { espnLogo } from "../../utils/helpers";

class StandingsList extends Component {
  componentDidMount() {
    // eslint-disable-next-line react/destructuring-assignment
    // this.props.fetchStandings();
  }

  createStandingsTable = teamsStandings => {
    const groupSize = 5;
    teamsStandings
      .map(item => (
        // map item to html elements
        <StandingsSingleTeam
          key={item.Key}
          logo={espnLogo(`${item.Key}`, 24)}
          division={`${item.League} ${item.Division}`}
          team={item}
        />
      ))
      .reduce((r, element, index) => {
        // create element groups with size 5, result looks like:
        // [[elem1, elem2, elem3], [elem4, elem5, elem6], ...]
        index % groupSize === 0 && r.push([]);
        r[r.length - 1].push(element);
        return r;
      }, [])
      .map(rowContent => (
        // surround every group with 'row'
        <StandingsDivision
          className="table"
          key={rowContent[0].props.division}
          division={rowContent[0].props.division}
          divisionTeams={rowContent}
        />
      ));
  };

  render() {
    const { standingsError, standingsLoading, standings } = this.props;

    const numberOfDivisions = standings.reduce((teams, team) => {
      const { League, Division } = team;
      const allTeams = teams;
      allTeams[`${League} ${Division}`] =
        (allTeams[`${League} ${Division}`] || 0) + 1;
      return allTeams;
    }, {});

    const groupSize = Object.keys(numberOfDivisions).length - 1;

    const teamRows = standings
      .map(item => (
        // map item to html elements
        <StandingsSingleTeam
          key={item.Key}
          logo={espnLogo(`${item.Key}`, 24)}
          division={`${item.League} ${item.Division}`}
          team={item}
        />
      ))
      .reduce((r, element, index) => {
        // create element groups with size 5, result looks like:
        // [[elem1, elem2, elem3], [elem4, elem5, elem6], ...]
        index % groupSize === 0 && r.push([]);
        r[r.length - 1].push(element);
        return r;
      }, [])
      .map(rowContent => (
        // surround every group with 'row'
        <StandingsDivision
          className="table"
          key={rowContent[0].props.division}
          division={rowContent[0].props.division}
          divisionTeams={rowContent}
        />
      ));

    if (standingsError) {
      return <div>Error! {standingsError.message}</div>;
    }

    if (standingsLoading && teamRows.length === numberOfDivisions) {
      return <div>Loading...</div>;
    }

    return <ul>{teamRows}</ul>;
  }
}

StandingsList.propTypes = {
  standingsError: null || PropTypes.bool,
  standingsLoading: PropTypes.bool.isRequired,
  standings: PropTypes.arrayOf(PropTypes.object).isRequired
  // fetchStandings: PropTypes.func.isRequired
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
