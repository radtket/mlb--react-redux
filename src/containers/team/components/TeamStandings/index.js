import React, { Component } from "react";
import PropTypes from "prop-types";
import StandingsTeam from "./StandingsTeam";
import { largestToSmallest, getLeagueName } from "../../../../utils/helpers";
import Tabs from "../../../../components/Tabs/Tabs";

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
        City,
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
              City={City}
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
              City={City}
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
        <Tabs>
          <div label={`${League} ${Division}`}>
            <table className="table table--standings">
              <thead>
                <tr>
                  <th />
                  <th>W</th>
                  <th>L</th>
                  <th>GB</th>
                </tr>
              </thead>
              <tbody>
                {standings &&
                  this.createStandingsTable(standings, activeTeamObj, true)}
              </tbody>
            </table>
          </div>
          <div label={getLeagueName(League)}>
            <table className="table table--standings">
              <thead>
                <tr>
                  <th />
                  <th>W</th>
                  <th>L</th>
                  <th>PCT</th>
                </tr>
              </thead>
              <tbody>
                {standings &&
                  this.createStandingsTable(
                    standings.sort(largestToSmallest("Percentage")),
                    activeTeamObj
                  )}
              </tbody>
            </table>
          </div>
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
