import React from "react";
import { format } from "date-fns";
import PropTypes from "prop-types";
import { TableNetworkCell, TableTeamCell, TableVenueCell } from "../TableParts";

const SingleTableRowGame = ({ home, away, broadcast, scheduled, venue }) => {
  const getProps = ({ market, name, abbr }) => ({
    Key: abbr,
    City: market,
    Name: name,
  });

  return (
    <tr>
      <TableTeamCell {...getProps(away)} />
      <td>@</td>
      <TableTeamCell {...getProps(home)} />
      <td>{format(scheduled, "h:mm A")}</td>
      <TableNetworkCell {...broadcast} />
      <TableVenueCell {...venue} />
      <td>Tickets</td>
    </tr>
  );
};

SingleTableRowGame.propTypes = {
  home: PropTypes.shape({
    abbr: PropTypes.string,
    market: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
  away: PropTypes.shape({
    abbr: PropTypes.string,
    market: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
  broadcast: PropTypes.shape({
    network: PropTypes.string,
  }),
  scheduled: PropTypes.string.isRequired,
  venue: PropTypes.shape({
    name: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
  }),
};

SingleTableRowGame.defaultProps = {
  broadcast: PropTypes.shape({
    network: null,
  }),
  venue: PropTypes.shape({
    name: null,
    city: null,
    state: null,
  }),
};

export default SingleTableRowGame;
