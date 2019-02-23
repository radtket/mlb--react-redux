import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { espnLogo } from "../../../utils/helpers";

const StandingsSingleTeam = ({ team }) => {
  const {
    City,
    Wins,
    Losses,
    GamesBehind,
    HomeWins,
    HomeLosses,
    AwayWins,
    AwayLosses,
    TeamID,
    Name,
    Key,
  } = team;
  return (
    <tr key={TeamID}>
      <td className="standings__team">
        <Link to={`/teams/${Key}`}>
          {/* <img src={logo} alt={`${City} ${Name} Logo`} /> */}
          <img src={espnLogo(`${Key}`, 36)} alt={`${City} ${Name} Logo`} />
          <figcaption className="standings__team--arbv">{Key}</figcaption>
          <figcaption className="standings__team--city">{City} </figcaption>
          <figcaption className="standings__team--full">{Name}</figcaption>
        </Link>
      </td>
      <td>{Wins}</td>
      <td>{Losses}</td>
      <td>
        {(Number(`${Wins}`) / (Number(`${Wins}`) + Number(`${Losses}`)))
          .toFixed(3)
          .replace(/^0+/, "")}
      </td>
      <td>{GamesBehind || "-"}</td>
      <td>{`${HomeWins} - ${HomeLosses}`}</td>
      <td>{`${AwayWins} - ${AwayLosses}`}</td>
    </tr>
  );
};

StandingsSingleTeam.propTypes = {
  team: PropTypes.shape({
    City: PropTypes.string.isRequired,
    Wins: PropTypes.number.isRequired,
    Losses: PropTypes.number.isRequired,
    GamesBehind: PropTypes.number,
    HomeWins: PropTypes.number.isRequired,
    HomeLosses: PropTypes.number.isRequired,
    AwayWins: PropTypes.number.isRequired,
    AwayLosses: PropTypes.number.isRequired,
    TeamID: PropTypes.number.isRequired,
    Name: PropTypes.string.isRequired,
  }),
};

StandingsSingleTeam.defaultProps = {
  team: PropTypes.shape({
    GamesBehind: "-",
  }).isRequired,
};

export default StandingsSingleTeam;
