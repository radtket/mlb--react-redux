import React from "react";
import PropTypes from "prop-types";
import NumberOfInnings from "./NumberOfInnings";
import BuildTeamLineScore from "./BuildTeamLineScore";

const SingleGameInningScoreboard = ({
  AwayTeam,
  AwayTeamErrors,
  AwayTeamHits,
  AwayTeamRuns,
  HomeTeam,
  HomeTeamErrors,
  HomeTeamHits,
  HomeTeamRuns,
  Innings,
  InningsInRegulation,
  GameID,
}) => {
  return (
    <div className="inning-scoreboard">
      <table>
        <thead>
          <tr>
            <th />
            <NumberOfInnings
              GameID={GameID}
              Innings={Innings}
              InningsInRegulation={InningsInRegulation}
            />
            <th>R</th>
            <th>H</th>
            <th>E</th>
          </tr>
        </thead>
        <tbody>
          <BuildTeamLineScore
            Innings={Innings}
            InningsInRegulation={InningsInRegulation}
            Team={AwayTeam}
            TeamErrors={AwayTeamErrors}
            TeamHits={AwayTeamHits}
            TeamRuns={AwayTeamRuns}
          />
          <BuildTeamLineScore
            Innings={Innings}
            InningsInRegulation={InningsInRegulation}
            isHome
            Team={HomeTeam}
            TeamErrors={HomeTeamErrors}
            TeamHits={HomeTeamHits}
            TeamRuns={HomeTeamRuns}
          />
        </tbody>
      </table>
    </div>
  );
};

SingleGameInningScoreboard.propTypes = {
  AwayTeam: PropTypes.string.isRequired,
  AwayTeamErrors: PropTypes.number,
  AwayTeamHits: PropTypes.number,
  AwayTeamRuns: PropTypes.number,
  HomeTeam: PropTypes.string.isRequired,
  HomeTeamErrors: PropTypes.number,
  HomeTeamHits: PropTypes.number,
  HomeTeamRuns: PropTypes.number,
  Innings: PropTypes.arrayOf(PropTypes.object).isRequired,
  InningsInRegulation: PropTypes.number.isRequired,
  GameID: PropTypes.number.isRequired,
};

SingleGameInningScoreboard.defaultProps = {
  HomeTeamErrors: null,
  HomeTeamHits: null,
  HomeTeamRuns: null,
  AwayTeamErrors: null,
  AwayTeamHits: null,
  AwayTeamRuns: null,
};

export default SingleGameInningScoreboard;
