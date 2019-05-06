import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { espnLogo } from "../../utils/helpers";

const SingleGameTeam = ({
  AwayLosses,
  AwayWins,
  Errors,
  GameStatusPostponed,
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
      {!GameStatusPostponed && (
        <>
          <td className="score score__total">{Runs}</td>
          <td className="score">{Hits}</td>
          <td className="score">{Errors}</td>
        </>
      )}
    </tr>
  );
};

SingleGameTeam.propTypes = {
  AwayLosses: PropTypes.number,
  AwayWins: PropTypes.number,
  Errors: PropTypes.number,
  GameStatusPostponed: PropTypes.bool,
  Hits: PropTypes.number,
  HomeLosses: PropTypes.number,
  HomeWins: PropTypes.number,
  isHome: PropTypes.bool,
  Key: PropTypes.string.isRequired,
  Losses: PropTypes.number,
  Name: PropTypes.string.isRequired,
  Runs: PropTypes.number,
  Wins: PropTypes.number,
};

SingleGameTeam.defaultProps = {
  AwayLosses: null,
  AwayWins: null,
  Errors: 0,
  GameStatusPostponed: false,
  Hits: 0,
  HomeLosses: null,
  HomeWins: null,
  isHome: false,
  Losses: 0,
  Runs: 0,
  Wins: 0,
};

export default SingleGameTeam;
