import React from "react";
import PropTypes from "prop-types";
import { roundHalf } from "../../utils/helpers";

const Odds = ({ HomeTeamMoneyLine, HomeTeam, OverUnder }) => {
  return (
    <ul className="scoreboard-detail__odds">
      {HomeTeamMoneyLine && <li>Line: {`${HomeTeam} ${HomeTeamMoneyLine}`}</li>}
      {OverUnder && <li>O/U: {roundHalf(OverUnder)}</li>}
    </ul>
  );
};

Odds.propTypes = {
  HomeTeamMoneyLine: PropTypes.number.isRequired,
  HomeTeam: PropTypes.string.isRequired,
  OverUnder: PropTypes.number.isRequired,
};

export default Odds;
