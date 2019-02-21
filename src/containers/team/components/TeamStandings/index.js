import React, { Component } from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Table from "react-bootstrap/Table";
import PropTypes from "prop-types";
import StandingsTeam from "./StandingsTeam";
import {
  largestToSmallest,
  getLeagueName,
  slugify,
} from "../../../../utils/helpers";

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
        TeamID,
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
              key={TeamID}
              teamName={Name}
              teamLogo={TeamKey}
              wins={Wins}
              loses={Losses}
              gb={GamesBehind}
            />
          );
      } else {
        TeamLeague === ActiveLeague &&
          divisionTeams.push(
            <StandingsTeam
              activeTeam={TeamKey === ActiveKey}
              key={TeamID}
              teamName={Name}
              teamLogo={TeamKey}
              wins={Wins}
              loses={Losses}
              percentage={Percentage.toFixed(3).replace(/^0+/, "")}
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
            <Table>
              <tbody>
                {standings &&
                  this.createStandingsTable(standings, activeTeamObj, true)}
              </tbody>
            </Table>
          </Tab>
          <Tab eventKey={slugify(League)} title={getLeagueName(League)}>
            <Table>
              <tbody>
                {standings &&
                  this.createStandingsTable(standings, activeTeamObj).sort(
                    largestToSmallest("Percentage")
                  )}
              </tbody>
            </Table>
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
