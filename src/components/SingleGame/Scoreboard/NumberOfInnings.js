import React from "react";
import PropTypes from "prop-types";

const NumberOfInnings = ({ GameID, Innings, InningsInRegulation }) => {
  if (Innings.length >= InningsInRegulation) {
    return Innings.map(inning => (
      <th key={`${GameID} Inning ${inning.InningNumber}`}>
        {inning.InningNumber}
      </th>
    ));
  }

  return Array.from({ length: InningsInRegulation }, (_, idx) => {
    const i = idx + 1;
    return <th key={`${GameID} Inning ${i}`}>{i}</th>;
  });
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
