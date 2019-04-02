import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { espnLogo } from "../../../utils/helpers";

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
      <td className="standings__team">
        <Link to={`/teams/${TeamKey}`}>
          <img
            src={espnLogo(`${TeamKey}`, 36)}
            alt={`${City} ${TeamName} Logo`}
          />
          <figcaption className="standings__team--arbv">{TeamKey}</figcaption>
          {/* <figcaption className="standings__team--city">{City} </figcaption> */}
          <figcaption className="standings__team--full">{TeamName}</figcaption>
        </Link>
      </td>

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
