import React from "react";
import PropTypes from "prop-types";

const StandingsSingleTeam = ({ logo, team }) => {
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
    Name
  } = team;
  return (
    <tr key={TeamID}>
      <td className="standings--team">
        <span className="standings--team__logo">
          <img src={logo} alt={`${City} ${Name} Logo`} />
        </span>
        {City}
      </td>
      <td>{Wins}</td>
      <td>{Losses}</td>
      <td>
        {(Number(`${Wins}`) / (Number(`${Wins}`) + Number(`${Losses}`)))
          .toFixed(3)
          .replace(/^0+/, "")}
      </td>
      <td>
        {GamesBehind ? (Math.round(`${GamesBehind}` * 2) / 2).toFixed(1) : "-"}
      </td>
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
    Name: PropTypes.string.isRequired
  }),
  logo: PropTypes.string.isRequired
};

StandingsSingleTeam.defaultProps = {
  team: PropTypes.shape({
    GamesBehind: "-"
  }).isRequired
};

export default StandingsSingleTeam;
