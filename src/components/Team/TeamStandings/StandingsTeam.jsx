import React from "react";
import PropTypes from "prop-types";
import { TableTeamCell } from "../../TableParts";

const StandingsTeam = ({
  activeTeam,
  TeamKey,
  TeamName,
  City,
  Wins,
  Losses,
  Percentage,
  GamesBehind,
}) => {
  return (
    <tr className={activeTeam ? "active-team" : ""}>
      <TableTeamCell Key={TeamKey} City={City} hideCity Name={TeamName} />
      <td>{Wins}</td>
      <td>{Losses}</td>
      {Percentage && <td>{Percentage}</td>}
      {(GamesBehind || GamesBehind == null) && (
        <td>{GamesBehind != null ? GamesBehind : "-"}</td>
      )}
    </tr>
  );
};

export default StandingsTeam;

StandingsTeam.propTypes = {
  City: PropTypes.string.isRequired,
  TeamKey: PropTypes.string.isRequired,
  TeamName: PropTypes.string.isRequired,
  Wins: PropTypes.number.isRequired,
  Losses: PropTypes.number.isRequired,
  GamesBehind: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
  ]),
  activeTeam: PropTypes.bool,
  Percentage: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

StandingsTeam.defaultProps = {
  GamesBehind: false,
  activeTeam: false,
  Percentage: false,
};
