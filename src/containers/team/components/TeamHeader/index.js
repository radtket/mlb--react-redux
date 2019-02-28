import React, { Component } from "react";
import PropTypes from "prop-types";
import Dropdown from "react-dropdown";
import { espnLogo, socialMedia } from "../../../../utils/helpers";
import { IconInstagram, IconTwitter } from "../../../../components/Icons";

class TeamHeader extends Component {
  createTeamsDropdown = (teams, currentTeamAbrv) => {
    return teams.reduce((allTeams, team) => {
      const { Key, Name } = team;
      allTeams.push({
        value: Key,
        label: Name,
        className: Key === currentTeamAbrv && "active",
      });
      return allTeams;
    }, []);
  };

  render() {
    const {
      teams,
      City,
      Name,
      PrimaryColor,
      WikipediaLogoUrl,
      Key,
      changeTeams,
    } = this.props;
    const { Twitter, Instagram } = socialMedia[Key];

    return (
      <header className="header-team">
        <div className="container">
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
            options={this.createTeamsDropdown(teams, Key)}
            onChange={changeTeams}
            placeholder="More MLB teams"
          />

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
        </div>
      </header>
    );
  }
}

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
