import React from "react";
import PropTypes from "prop-types";
import Dropdown from "react-dropdown";
import { NavLink } from "react-router-dom";
import { espnLogo, socialMedia, propComparator } from "../../utils/helpers";
import { IconInstagram, IconTwitter } from "../Icons";

const TeamHeader = ({
  teams,
  City,
  Name,
  PrimaryColor,
  WikipediaLogoUrl,
  Key,
  changeTeams,
}) => {
  const createTeamsDropdown = (teamsArg, currentTeamAbrv) => {
    return teamsArg
      .reduce((allTeams, team) => {
        const { Key: TeamKey, Name: TeamName } = team;
        allTeams.push({
          value: TeamKey,
          label: TeamName,
          className: TeamKey === currentTeamAbrv && "active",
        });
        return allTeams;
      }, [])
      .sort(propComparator("label"));
  };

  const { Twitter, Instagram } = socialMedia[Key];

  return (
    <header className="header-team">
      <div className="container">
        <div className="row">
          <figure className="team">
            <img
              className="team__logo"
              src={espnLogo(Key, 64) || WikipediaLogoUrl}
              alt={`${City} ${Name} Logo`}
            />
            <h1 className="team__name" style={{ color: `#${PrimaryColor}` }}>
              <span className="team__name--city">{City} </span>
              {Name}
            </h1>
          </figure>

          <Dropdown
            className="team__teams-dropdown"
            style={{ position: "absolute", right: 0, top: 24 }}
            options={createTeamsDropdown(teams, Key)}
            onChange={changeTeams}
            placeholder="More MLB teams"
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
            </ul>
            <ul className="team__social">
              <li className="team__social--item">
                <a
                  style={{ color: `#${PrimaryColor}` }}
                  href={`https://twitter.com/${Twitter}`}
                  target="_blank"
                  rel="noopener noreferrer">
                  <IconTwitter />
                </a>
              </li>
              <li className="team__social--item">
                <a
                  style={{ color: `#${PrimaryColor}` }}
                  href={`https://www.instagram.com/${Instagram}`}
                  target="_blank"
                  rel="noopener noreferrer">
                  <IconInstagram />
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

TeamHeader.propTypes = {
  teams: PropTypes.arrayOf(PropTypes.object).isRequired,
  Key: PropTypes.string.isRequired,
  City: PropTypes.string.isRequired,
  Name: PropTypes.string.isRequired,
  PrimaryColor: PropTypes.string.isRequired,
  WikipediaLogoUrl: PropTypes.string.isRequired,
  changeTeams: PropTypes.func.isRequired,
};

export default TeamHeader;
