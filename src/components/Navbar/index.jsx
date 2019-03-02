import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import DivisionComponent from "./MegaMenu/DivisionComponent";
import { sortTeamsByDivion } from "../../utils/helpers";
import Dropdown from "../Dropdown";
import { SiteLogo } from "../Icons";

class Header extends Component {
  createMegaMenu = teams => {
    let cols = [];
    return sortTeamsByDivion(teams).reduce((rows, element, index) => {
      const [DivisionName, TeamsInComponents] = element;
      const { League: LeaugeName } = TeamsInComponents[0];
      cols.push(
        <DivisionComponent
          key={DivisionName}
          DivisionName={DivisionName}
          TeamsInDivision={TeamsInComponents}
        />
      );
      if ((index + 1) % 3 === 0) {
        rows.push(
          <div className="row" key={LeaugeName}>
            {cols}
          </div>
        );
        cols = [];
      }
      return rows;
    }, []);
  };

  render() {
    const { teams } = this.props;
    return (
      <header className="header">
        <div className="container header__inner">
          <figure className="header__logo">
            <Link to="/">
              <SiteLogo />
            </Link>
          </figure>

          <div className="header__nav">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/scores">Scores</Link>
              </li>
              <li>
                <Link to="/standings">Standings</Link>
              </li>
              <li>
                <Link to="/news">News</Link>
              </li>
              <li>
                <Dropdown
                  Title="Teams"
                  MenuItems={teams && this.createMegaMenu(teams)}
                />
              </li>
            </ul>
          </div>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  teams: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Header;
