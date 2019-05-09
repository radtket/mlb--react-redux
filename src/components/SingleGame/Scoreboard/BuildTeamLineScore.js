import React from "react";
import PropTypes from "prop-types";
import TeamRunsInInning from "./TeamRunsInInning";

const BuildTeamLineScore = ({
  isHome,
  Team,
  TeamRuns,
  TeamHits,
  TeamErrors,
  Innings,
  InningsInRegulation,
}) => {
  return (
    <tr>
      <td>{Team}</td>
      <TeamRunsInInning
        Innings={Innings}
        InningsInRegulation={InningsInRegulation}
        isHome={isHome}
        Team={Team}
      />
      <td>{TeamRuns || 0}</td>
      <td>{TeamHits || 0}</td>
      <td>{TeamErrors || 0}</td>
    </tr>
  );
};

BuildTeamLineScore.propTypes = {
  isHome: PropTypes.bool,
  Team: PropTypes.string.isRequired,
  TeamRuns: PropTypes.number,
  TeamHits: PropTypes.number,
  TeamErrors: PropTypes.number,
  Innings: PropTypes.arrayOf(
    PropTypes.shape({
      AwayTeamRuns: PropTypes.number,
      HomeTeamRuns: PropTypes.number,
    })
  ).isRequired,
  InningsInRegulation: PropTypes.number.isRequired,
};

BuildTeamLineScore.defaultProps = {
  isHome: false,
  TeamRuns: 0,
  TeamHits: 0,
  TeamErrors: 0,
};

export default BuildTeamLineScore;
