import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { teamFinder, espnLogo } from "../../../utils/helpers";

const SingleGame = ({
  AwayTeam,
  HomeTeam,
  activeTeam,
  DateTime,
  HomeTeamRuns,
  AwayTeamRuns,
  IsClosed,
  Status,
  GameID,
  Channel,
}) => {
  const isHomeTeam = activeTeam === HomeTeam;
  const OpponentKey = isHomeTeam ? AwayTeam : HomeTeam;
  const MyTeamScore = isHomeTeam ? HomeTeamRuns : AwayTeamRuns;
  const OpponentScore = isHomeTeam ? AwayTeamRuns : HomeTeamRuns;

  const { City: OpponentCity, Name: OpponentName } = teamFinder[OpponentKey];

  const GameStatusFinal = IsClosed && Status === "Final";
  const GameStatusScheduled = Status === "Scheduled";
  const GameIsInProgress = Status === "In Progress";
  const GameStatusPostponed = Status === "Postponed";

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
            alt={`${OpponentCity} ${OpponentName} Logo`}
            src={espnLogo(OpponentKey, 40)}
          />
        </figure>

        <figcaption className="opponent-info opponent-info__arbv">
          {`${HomeOrAway} ${OpponentKey} `}
        </figcaption>
        <figcaption className="opponent-info opponent-info__full">
          {`${HomeOrAway} ${OpponentName} `}
        </figcaption>

        <ul className="game-meta">
          {GameStatusScheduled && (
            <>
              <li className="game-meta__date">
                {format(new Date(DateTime), "M[/]D")}
              </li>
              <li className="game-meta__time">
                {format(new Date(DateTime), "h:mm A")}
              </li>
              <li className="game-meta__network">{Channel}</li>
            </>
          )}

          {GameStatusFinal && (
            <li className={`game-meta__result ${DidWin ? "win" : "loss"}`}>
              {WinOrLoss}
            </li>
          )}
          {(GameStatusFinal || GameIsInProgress) && (
            <li className="game-meta__score">{GameScore}</li>
          )}
          {GameStatusPostponed && (
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
  DateTime: PropTypes.string.isRequired,
  HomeTeamRuns: PropTypes.number,
  AwayTeamRuns: PropTypes.number,
  IsClosed: PropTypes.bool.isRequired,
  Status: PropTypes.string.isRequired,
  GameID: PropTypes.number.isRequired,
  Channel: PropTypes.string,
};

SingleGame.defaultProps = {
  HomeTeamRuns: 0,
  AwayTeamRuns: 0,
  Channel: "",
};

export default SingleGame;
