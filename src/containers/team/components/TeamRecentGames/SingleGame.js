import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { teamFinder, espnLogo } from "../../../../utils/helpers";

const SingleGame = ({
  AwayTeam,
  HomeTeam,
  Day,
  activeTeam,
  classes,
  HomeTeamRuns,
  AwayTeamRuns,
  IsClosed,
  Status,
  GameID,
  IsClosed: GameClosed,
}) => {
  const isHomeTeam = activeTeam === HomeTeam;
  const OpponentKey = isHomeTeam ? AwayTeam : HomeTeam;
  const MyTeamScore = isHomeTeam ? HomeTeamRuns : AwayTeamRuns;
  const OpponentScore = isHomeTeam ? AwayTeamRuns : HomeTeamRuns;

  const {
    City: OpponentCity,
    Name: OpponentName,
    PrimaryColor: OpponentPrimaryColor,
  } = teamFinder(OpponentKey);

  const GameIsFinal = GameClosed && Status === "Final";
  const GameIsScheduled = Status === "Scheduled";
  const GameIsInProgress = Status === "In Progress";
  const GameIsPostponed = Status === "Postponed";

  const DidWin = MyTeamScore > OpponentScore && true;
  const WinOrLoss = DidWin ? "W" : "L";
  const HomeOrAway = isHomeTeam ? "vs" : "@";
  const GameScore = isHomeTeam
    ? `${OpponentScore} - ${MyTeamScore}`
    : `${MyTeamScore} - ${OpponentScore}`;

  return (
    <li className="game">
      <Link to={`/game/${GameID}`}>
        <figure className="opponent-logo">
          <img
            src={espnLogo(OpponentKey, 40)}
            alt={`${OpponentCity} ${OpponentName} Logo`}
          />
        </figure>
        <div className="opponent-info opponent-info__arbv">{`${HomeOrAway} ${OpponentKey} `}</div>
        <div className="opponent-info opponent-info__full">{`${HomeOrAway} ${OpponentName} `}</div>

        <ul className="game-meta">
          {GameIsScheduled && (
            <>
              <li className="game-meta__date">2/21</li>
              <li className="game-meta__time">8:00 PM</li>
              <li className="game-meta__network">TNT</li>
            </>
          )}

          {GameIsFinal && (
            <li className={`game-meta__result ${DidWin ? "win" : "loss"}`}>
              {WinOrLoss}
            </li>
          )}
          {(GameIsFinal || GameIsInProgress) && (
            <li className="game-meta__score">{GameScore}</li>
          )}
          {GameIsPostponed && (
            <li className="game-meta__postponed">{Status}</li>
          )}
        </ul>
      </Link>
    </li>
  );
};

SingleGame.propTypes = {
  AwayTeam: PropTypes.string.isRequired,
  HomeTeam: PropTypes.string.isRequired,
  activeTeam: PropTypes.string.isRequired,
};

export default SingleGame;
