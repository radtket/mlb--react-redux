import React, { Component } from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
// import Table from "react-bootstrap/Table";
import PropTypes from "prop-types";
import styled from "styled-components";
import StandingsTeam from "./StandingsTeam";
import {
  largestToSmallest,
  getLeagueName,
  slugify,
} from "../../../../utils/helpers";

const StandingsTable = styled.table`
  width: 100%;
  margin: auto;
  border: 0;
  border-spacing: 0;
  border-collapse: separate;
`;

class TeamStandings extends Component {
  createStandingsTable = (standings, activeTeamObj, division = false) => {
    return standings.reduce((divisionTeams, team) => {
      const {
        League: ActiveLeague,
        Division: ActiveDivision,
        Key: ActiveKey,
      } = activeTeamObj;
      const {
        League: TeamLeague,
        Division: TeamDivision,
        Key: TeamKey,
        Name,
        Wins,
        Losses,
        Percentage,
        GamesBehind,
      } = team;

      if (division) {
        TeamLeague === ActiveLeague &&
          TeamDivision === ActiveDivision &&
          divisionTeams.push(
            <StandingsTeam
              activeTeam={TeamKey === ActiveKey}
              key={TeamKey}
              GamesBehind={GamesBehind}
              Losses={Losses}
              TeamKey={TeamKey}
              TeamName={Name}
              Wins={Wins}
            />
          );
      } else {
        TeamLeague === ActiveLeague &&
          divisionTeams.push(
            <StandingsTeam
              activeTeam={TeamKey === ActiveKey}
              key={TeamKey}
              Losses={Losses}
              Percentage={Percentage.toFixed(3).replace(/^0+/, "")}
              TeamKey={TeamKey}
              TeamName={Name}
              Wins={Wins}
            />
          );
      }
      return divisionTeams;
    }, []);
  };

  render() {
    const { standings, activeTeamObj } = this.props;
    const { Division, League } = activeTeamObj;
    return (
      <div>
        <h5>Standings</h5>
        <Tabs
          defaultActiveKey={slugify(`${League} ${Division}`)}
          id="uncontrolled-tab-example">
          <Tab
            eventKey={slugify(`${League} ${Division}`)}
            title={`${League} ${Division}`}>
            <StandingsTable>
              <tbody>
                {standings &&
                  this.createStandingsTable(standings, activeTeamObj, true)}
              </tbody>
            </StandingsTable>
          </Tab>
          <Tab eventKey={slugify(League)} title={getLeagueName(League)}>
            <StandingsTable>
              <tbody>
                {standings &&
                  this.createStandingsTable(standings, activeTeamObj).sort(
                    largestToSmallest("Percentage")
                  )}
              </tbody>
            </StandingsTable>
          </Tab>
        </Tabs>
      </div>
    );
  }
}

TeamStandings.propTypes = {
  standings: PropTypes.arrayOf(PropTypes.object).isRequired,
  activeTeamObj: PropTypes.shape({
    League: PropTypes.string.isRequired,
    Key: PropTypes.string.isRequired,
  }).isRequired,
};

export default TeamStandings;
