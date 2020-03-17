import React from "react";
import PropTypes from "prop-types";
import Dropdown from "react-dropdown";
import { NavLink } from "react-router-dom";
import { espnLogo, socialMedia, smallestToLargest } from "../../utils/helpers";
import { IconInstagram, IconTwitter } from "../Icons";
import { TeamHeaderStyles } from "../../pages/Team/TeamStyles";

const TeamHeader = ({
  teams,
  City,
  Name,
  WikipediaLogoUrl,
  Key,
  changeTeams,
}) => {
  const createTeamsDropdown = (teamsArg, currentTeamAbrv) => {
    return teamsArg
      .reduce((allTeams, { Key: TeamKey, Name: TeamName }) => {
        allTeams.push({
          value: TeamKey,
          label: TeamName,
          className: TeamKey === currentTeamAbrv && "active",
        });
        return allTeams;
      }, [])
      .sort(smallestToLargest("label"));
  };

  const { Twitter, Instagram } = socialMedia[Key];

  return (
    <TeamHeaderStyles className="header-team">
      <div className="container">
        <div className="row">
          <figure className="team">
            <img
              alt={`${City} ${Name} Logo`}
              className="team__logo"
              src={espnLogo(Key, 64) || WikipediaLogoUrl}
            />
            <h1 className="team__name">
              <span className="team__name--city">{City} </span>
              {Name}
            </h1>
          </figure>

          <Dropdown
            className="team__teams-dropdown"
            onChange={changeTeams}
            options={createTeamsDropdown(teams, Key)}
            placeholder="More MLB teams"
            style={{ position: "absolute", right: 0, top: 24 }}
          />
        </div>

        <div className="row">
          <nav className="team__nav">
            <ul>
              <li>
                <NavLink exact to={`/teams/${Key}`}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink exact to={`/teams/${Key}/roster`}>
                  Roster
                </NavLink>
              </li>
              <li>
                <NavLink exact to={`/teams/${Key}/stats`}>
                  Stats
                </NavLink>
              </li>
              <li>
                <NavLink exact to={`/teams/${Key}/depth`}>
                  Depth Chart
                </NavLink>
              </li>
              <li>
                <NavLink exact to={`/teams/${Key}/schedule`}>
                  Schedule
                </NavLink>
              </li>
              <li>
                <NavLink exact to={`/teams/${Key}/tickets`}>
                  Tickets
                </NavLink>
              </li>
              <li>
                <NavLink exact to={`/teams/${Key}/splits`}>
                  Splits
                </NavLink>
              </li>
            </ul>
            <ul className="team__social">
              <li className="team__social--item">
                <a
                  href={`https://twitter.com/${Twitter}`}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <IconTwitter />
                </a>
              </li>
              <li className="team__social--item">
                <a
                  href={`https://www.instagram.com/${Instagram}`}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <IconInstagram />
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </TeamHeaderStyles>
  );
};

TeamHeader.propTypes = {
  teams: PropTypes.arrayOf(PropTypes.object).isRequired,
  Key: PropTypes.string.isRequired,
  City: PropTypes.string.isRequired,
  Name: PropTypes.string.isRequired,
  WikipediaLogoUrl: PropTypes.string.isRequired,
  changeTeams: PropTypes.func.isRequired,
};

export default TeamHeader;
