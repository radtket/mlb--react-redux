import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { espnLogo } from "../../../../utils/helpers";

const StandingsTeam = ({
  activeTeam,
  teamLogo,
  teamName,
  wins,
  loses,
  percentage,
  gb,
}) => (
  <tr className={activeTeam ? "standings__active-team" : ""}>
    <td>
      <Link to={`/teams/${teamLogo}`}>
        <figure className="standings__team--logo">
          <img src={espnLogo(`${teamLogo}`, 24)} alt={`${teamName} Logo`} />
        </figure>
        <figcaption className="standings__team--name">{teamName}</figcaption>
      </Link>
    </td>
    <td>{wins}</td>
    <td>{loses}</td>
    {percentage && <td>{percentage}</td>}
    {(gb || gb == null) && <td>{gb != null ? gb : "-"}</td>}
  </tr>
);

export default StandingsTeam;

StandingsTeam.propTypes = {
  teamLogo: PropTypes.string.isRequired,
  teamName: PropTypes.string.isRequired,
  wins: PropTypes.number.isRequired,
  loses: PropTypes.number.isRequired,
  gb: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
  activeTeam: PropTypes.bool,
  percentage: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

StandingsTeam.defaultProps = {
  gb: false,
  activeTeam: false,
  percentage: false,
};
