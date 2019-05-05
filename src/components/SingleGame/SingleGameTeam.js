import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { espnLogo } from "../../utils/helpers";

const SingleGameTeam = ({
  AwayLosses,
  AwayWins,
  Errors,
  Hits,
  HomeLosses,
  HomeWins,
  isHome,
  Key,
  Losses,
  Name,
  Runs,
  Wins,
}) => {
  return (
    <tr className={`${isHome ? "home" : "away"}`}>
      <td className={`team team__${isHome ? "home" : "away"}`}>
        <Link to={`/teams/${Key}`} className="team__logo--wrap">
          <img className="team__logo" src={espnLogo(`${Key}`, 70)} alt="" />
        </Link>
        <div className="team__meta">
          <Link to={`/teams/${Key}`} className="team__name">
            <span className="team__name--full">{Name}</span>
            <abbr className="team__name--abrv">{Key}</abbr>
          </Link>
          <ul className="team__record--wrap">
            <li className="team__record">
              ({Wins}-{Losses}
              <span
                className={`team team__record--${isHome ? "home" : "away"}`}>
                ,
                {isHome
                  ? `${HomeWins}-${HomeLosses} Home`
                  : `${AwayWins}-${AwayLosses} Away`}
              </span>
              )
            </li>
          </ul>
        </div>
      </td>
      <td className="score score__total">{Runs}</td>
      <td className="score">{Hits}</td>
      <td className="score">{Errors}</td>
    </tr>
  );
};

SingleGameTeam.propTypes = {
  isHome: PropTypes.bool,
  AwayLosses: PropTypes.number,
  AwayWins: PropTypes.number,
  HomeLosses: PropTypes.number,
  HomeWins: PropTypes.number,
  Key: PropTypes.string.isRequired,
  Name: PropTypes.string.isRequired,

  Runs: PropTypes.number,
  Errors: PropTypes.number,
  Hits: PropTypes.number,

  Wins: PropTypes.number,
  Losses: PropTypes.number,
};

SingleGameTeam.defaultProps = {
  isHome: false,
  AwayLosses: null,
  AwayWins: null,
  HomeLosses: null,
  HomeWins: null,
  Hits: 0,
  Errors: 0,
  Runs: 0,
  Wins: 0,
  Losses: 0,
};

export default SingleGameTeam;
