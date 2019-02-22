import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { espnLogo } from "../../../../utils/helpers";

const TeamRow = styled.tr`
  background-color: #fff;

  &.standings__active-team {
    td {
      font-weight: bold;
    }
  }
  td {
    font-size: 11px;
    color: #000;
    font-weight: 400;
    vertical-align: middle;
    padding: 5px 10px;
    vertical-align: middle;
  }
`;

const TeamLogo = styled.td`
  position: relative;
  text-align: left;
  white-space: nowrap;
  > a {
    display: inline-block;
    height: 36px;
    line-height: 30px;
    white-space: nowrap;
    img {
      height: 36px;
      margin-right: 5px;
      vertical-align: middle;
      width: 36px;
    }
    figcaption {
      color: #000;
      display: inline;
      font-size: 11px;
      vertical-align: middle;

      &.standings__team--arbv {
        display: none;
      }
    }
  }
`;

const StandingsColumn = styled.td`
  position: relative;
  white-space: nowrap;
`;

const StandingsTeam = ({
  activeTeam,
  TeamKey,
  TeamName,
  Wins,
  Losses,
  Percentage,
  GamesBehind,
}) => (
  <TeamRow className={activeTeam ? "standings__active-team" : ""}>
    <TeamLogo>
      <Link to={`/teams/${TeamKey}`}>
        <img src={espnLogo(`${TeamKey}`, 36)} alt={`${TeamName} Logo`} />
        <figcaption className="standings__team--arbv">{TeamKey}</figcaption>
        <figcaption className="standings__team--full">{TeamName}</figcaption>
      </Link>
    </TeamLogo>
    <StandingsColumn>{Wins}</StandingsColumn>
    <StandingsColumn>{Losses}</StandingsColumn>
    {Percentage && <StandingsColumn>{Percentage}</StandingsColumn>}
    {(GamesBehind || GamesBehind == null) && (
      <StandingsColumn>
        {GamesBehind != null ? GamesBehind : "-"}
      </StandingsColumn>
    )}
  </TeamRow>
);

export default StandingsTeam;

StandingsTeam.propTypes = {
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
