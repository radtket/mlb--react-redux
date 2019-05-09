import React from "react";
import PropTypes from "prop-types";

const NumberOfInnings = ({ GameID, Innings, InningsInRegulation }) => {
  const defaultInnings = [];
  if (Innings.length >= InningsInRegulation) {
    return Innings.map(inning => (
      <th key={`${GameID} Inning ${inning.InningNumber}`}>
        {inning.InningNumber}
      </th>
    ));
  }

  for (let i = 1; i <= InningsInRegulation; i += 1) {
    defaultInnings.push(<th key={`${GameID} Inning ${i}`}>{i}</th>);
  }

  return defaultInnings;
};

NumberOfInnings.propTypes = {
  GameID: PropTypes.number.isRequired,
  InningsInRegulation: PropTypes.number.isRequired,
  Innings: PropTypes.arrayOf(
    PropTypes.shape({
      InningNumber: PropTypes.number,
    })
  ).isRequired,
};

export default NumberOfInnings;
