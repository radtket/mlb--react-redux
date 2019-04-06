import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import StandingsTeam from "./StandingsTeam";
import { largestToSmallest, getLeagueName } from "../../../utils/helpers";
import Tabs from "../../Tabs/Tabs";
import Card from "../../Card";

const TeamStandings = ({ standings, activeTeamObj }) => {
  const createStandingsTable = (
    standingsArg,
    activeTeamObjArg,
    division = false
  ) => {
    return standingsArg.reduce((divisionTeams, team) => {
      const {
        League: ActiveLeague,
        Division: ActiveDivision,
        Key: ActiveKey,
      } = activeTeamObjArg;
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

  const { Division, League } = activeTeamObj;
  return (
    <Card
      title="Standings"
      body={
        <>
          <Tabs itemWidth="50%">
            <div label="Division">
              <table
                className="table table--standings"
                style={{
                  boxShadow: "none",
                }}>
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
                }}>
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
    />
  );
};

TeamStandings.propTypes = {
  standings: PropTypes.arrayOf(PropTypes.object).isRequired,
  activeTeamObj: PropTypes.shape({
    League: PropTypes.string.isRequired,
    Key: PropTypes.string.isRequired,
  }).isRequired,
};

export default TeamStandings;
