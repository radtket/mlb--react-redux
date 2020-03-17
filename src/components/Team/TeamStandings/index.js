import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import StandingsTeam from "./StandingsTeam";
import { largestToSmallest, getLeagueName } from "../../../utils/helpers";
import Tabs from "../../Tabs/Tabs";
import Card from "../../Card";

const TeamStandings = ({ standings, activeTeamObj }) => {
  const { Division, League } = activeTeamObj;
  const createStandingsTable = (
    standingsArg,
    { League: ActiveLeague, Division: ActiveDivision, Key: ActiveKey },
    division = false
  ) => {
    return standingsArg.reduce(
      (
        divisionTeams,
        {
          League: TeamLeague,
          Division: TeamDivision,
          Key: TeamKey,
          City,
          Name,
          Wins,
          Losses,
          Percentage,
          GamesBehind,
        }
      ) => {
        if (division) {
          TeamLeague === ActiveLeague &&
            TeamDivision === ActiveDivision &&
            divisionTeams.push(
              <StandingsTeam
                {...{ City, GamesBehind, Losses, TeamKey, Wins }}
                key={TeamKey}
                activeTeam={TeamKey === ActiveKey}
                TeamName={Name}
              />
            );
        } else {
          TeamLeague === ActiveLeague &&
            divisionTeams.push(
              <StandingsTeam
                {...{ City, GamesBehind, Losses, TeamKey, Wins }}
                key={TeamKey}
                activeTeam={TeamKey === ActiveKey}
                Percentage={Percentage.toFixed(3).replace(/^0+/, "")}
                TeamName={Name}
              />
            );
        }
        return divisionTeams;
      },
      []
    );
  };

  return (
    <Card
      body={
        <>
          <Tabs itemWidth="50%">
            <div label="Division">
              <table
                className="table table--standings"
                style={{
                  boxShadow: "none",
                }}
              >
                <thead>
                  <tr>
                    <th>{`${League} ${Division}`}</th>
                    <th>W</th>
                    <th>L</th>
                    <th>GB</th>
                  </tr>
                </thead>
                <tbody>
                  {standings &&
                    createStandingsTable(standings, activeTeamObj, true)}
                </tbody>
              </table>
            </div>
            <div label="League">
              <table
                className="table table--standings"
                style={{
                  boxShadow: "none",
                }}
              >
                <thead>
                  <tr>
                    <th>{getLeagueName(League)}</th>
                    <th>W</th>
                    <th>L</th>
                    <th>PCT</th>
                  </tr>
                </thead>
                <tbody>
                  {standings &&
                    createStandingsTable(
                      standings.sort(largestToSmallest("Percentage")),
                      activeTeamObj
                    )}
                </tbody>
              </table>
            </div>
          </Tabs>
          <footer className="card__footer">
            <Link className="text-uppercase" to="/standings">
              Full Standings
            </Link>
          </footer>
        </>
      }
      title="Standings"
    />
  );
};

TeamStandings.propTypes = {
  standings: PropTypes.arrayOf(PropTypes.object).isRequired,
  activeTeamObj: PropTypes.shape({
    League: PropTypes.string.isRequired,
    Key: PropTypes.string.isRequired,
    Division: PropTypes.string,
  }).isRequired,
};

export default TeamStandings;
