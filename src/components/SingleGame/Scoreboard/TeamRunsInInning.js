import React from "react";
import PropTypes from "prop-types";

const TeamRunsInInning = ({ isHome, Innings, InningsInRegulation, Team }) => {
  const defaultInnings = [];

  if (Innings.length >= InningsInRegulation) {
    return Innings.map(inning => {
      const { AwayTeamRuns, HomeTeamRuns, InningNumber } = inning;

      if (isHome && HomeTeamRuns === null) {
        return <td key={`${Team} ${InningNumber}`}>-</td>;
      }

      return (
        <td key={`${Team} ${InningNumber}`}>
          {isHome ? HomeTeamRuns : AwayTeamRuns}
        </td>
      );
    });
  }

  for (let index = 0; index < InningsInRegulation; index += 1) {
    const element = Innings[index];

    if (element !== undefined) {
      const { AwayTeamRuns, HomeTeamRuns } = element;
      defaultInnings.push(
        <td key={`${Team} ${index}`}>{isHome ? HomeTeamRuns : AwayTeamRuns}</td>
      );
    } else {
      defaultInnings.push(<td key={`${Team} ${index}`}>&nbsp;</td>);
    }
  }

  return defaultInnings;
};

TeamRunsInInning.propTypes = {
  isHome: PropTypes.bool,
  Team: PropTypes.string.isRequired,
  Innings: PropTypes.arrayOf(
    PropTypes.shape({
      AwayTeamRuns: PropTypes.number,
      HomeTeamRuns: PropTypes.number,
    })
  ).isRequired,
  InningsInRegulation: PropTypes.number.isRequired,
};

TeamRunsInInning.defaultProps = {
  isHome: false,
};

export default TeamRunsInInning;
