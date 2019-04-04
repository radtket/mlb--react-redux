import React from "react";
import PropTypes from "prop-types";
import dateFns from "date-fns";
import { espnLogo } from "../utils/helpers";

const CalendarGame = ({
  HomeTeam,
  opponent,
  Status,
  HomeTeamRuns,
  AwayTeamRuns,
  DateTime,
}) => {
  const isHomeGame = opponent !== HomeTeam;
  const isWin =
    (isHomeGame && HomeTeamRuns > AwayTeamRuns) ||
    (!isHomeGame && HomeTeamRuns < AwayTeamRuns);
  const WorL = isWin ? "W" : "L";
  const DateOfGame = new Date(DateTime);
  const GameTimeStamp = dateFns.format(DateOfGame, "YYYY-MM-DD HH:mm");
  const GameTime = dateFns.format(DateOfGame, "h:mm A");
  return (
    <>
      <img src={espnLogo(opponent, 40)} alt={opponent} />
      <h6>
        {isHomeGame ? "vs" : "@"} {opponent}
      </h6>
      {Status === "Final" ? (
        <strong>
          <span style={isWin ? { color: "green" } : { color: "red" }}>
            {WorL}
          </span>
          {`, ${HomeTeamRuns} - ${AwayTeamRuns}`}
        </strong>
      ) : (
        <time dateTime={GameTimeStamp}>{GameTime}</time>
      )}
    </>
  );
};

CalendarGame.propTypes = {
  HomeTeam: PropTypes.string.isRequired,
  opponent: PropTypes.string.isRequired,
  Status: PropTypes.string.isRequired,
  DateTime: PropTypes.string.isRequired,
  HomeTeamRuns: PropTypes.number,
  AwayTeamRuns: PropTypes.number,
};

CalendarGame.defaultProps = {
  HomeTeamRuns: null,
  AwayTeamRuns: null,
};

export default CalendarGame;
