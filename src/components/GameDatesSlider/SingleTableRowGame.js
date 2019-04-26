import React from "react";
import { format } from "date-fns";
import PropTypes from "prop-types";
import styled from "styled-components";
import { networkDecoder } from "../../utils/networks";
import { TableTeamCell } from "../TableParts";

const NetworkCell = styled.td`
  text-align: center;

  img,
  svg {
    display: block;
    height: 24px;
    margin: auto;
    max-width: 72px;
  }
`;

const SingleTableRowGame = ({ home, away, broadcast, scheduled, venue }) => {
  const { market: AwayTeamCity, name: AwayTeamName, abbr: AwayTeamKey } = away;

  const { market: HomeTeamCity, name: HomeTeamName, abbr: HomeTeamKey } = home;

  const { name: VenueName, city, state } = venue;
  return (
    <tr>
      <TableTeamCell
        Key={AwayTeamKey}
        City={AwayTeamCity}
        Name={AwayTeamName}
      />
      <td>@</td>
      <TableTeamCell
        Key={HomeTeamKey}
        City={HomeTeamCity}
        Name={HomeTeamName}
      />
      <td>{format(scheduled, "h:mm A")}</td>
      <NetworkCell className="text-center">
        {networkDecoder(broadcast.network)}
      </NetworkCell>
      <td>
        <strong>{VenueName}</strong>
        {` ${city}, ${state}`}
      </td>
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

// import React from "react";
// import { Link } from "react-router-dom";
// import { espnLogo, teamFinder } from "../../utils/helpers";
// // import PropTypes from 'prop-types'

// const SingleTableRowGame = ({
//   AwayTeam,
//   AwayTeamStartingPitcher,
//   HomeTeam,
//   HomeTeamStartingPitcher,
//   DateTime,
// }) => {
//   const { City: AwayTeamCity, Name: AwayTeamName } = teamFinder[AwayTeam];
//   const { City: HomeTeamCity, Name: HomeTeamName } = teamFinder[HomeTeam];
//   return (
//     <tr>
//       {/* <td>
//         <Link className="team-name" to={`/teams/${AwayTeam}`}>
//           <img
//             src={espnLogo(AwayTeam, 40)}
//             alt={`${AwayTeamCity} ${AwayTeamName} Logo`}
//           />
//           <span>{AwayTeamCity}</span>
//           <abbr title={`${AwayTeamCity} ${AwayTeamName}`}>{AwayTeam}</abbr>
//         </Link>
//         {` at `}
//         <Link className="team-name" to={`/teams/${HomeTeam}`}>
//           <img
//             src={espnLogo(HomeTeam, 40)}
//             alt={`${HomeTeamCity} ${HomeTeamName} Logo`}
//           />
//           <span>{HomeTeamCity}</span>
//           <abbr title={`${HomeTeamCity} ${HomeTeamName}`}>{HomeTeam}</abbr>
//         </Link>
//       </td> */}
//       {/* <td>{DateTime}</td> */}
//       <td>Network</td>
//       {/* <td>{`${AwayTeamStartingPitcher} ${HomeTeamStartingPitcher}`}</td> */}
//       <td>Tickets</td>
//     </tr>
//   );
// };

// // SingleTableRowGame.propTypes = {

// // }

// export default SingleTableRowGame;
