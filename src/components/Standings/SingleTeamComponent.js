import React from "react";
import PropTypes from "prop-types";
import { TableTeamCell, TableWinsLossesCell } from "../TableParts";

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
      <TableTeamCell Key={Key} City={City} Name={Name} />
      <td>{Wins}</td>
      <td>{Losses}</td>
      <td>
        {(Number(`${Wins}`) / (Number(`${Wins}`) + Number(`${Losses}`)))
          .toFixed(3)
          .replace(/^0+/, "")}
      </td>
      <td>{GamesBehind || "-"}</td>
      <TableWinsLossesCell Wins={HomeWins} Losses={HomeLosses} />
      <TableWinsLossesCell Wins={AwayWins} Losses={AwayLosses} />
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
