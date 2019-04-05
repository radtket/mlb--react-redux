import React from "react";
import { NavLink, Link } from "react-router-dom";
import PropTypes from "prop-types";

import MegaMenuDivision from "./MegaMenuDivision";
import { sortTeamsByDivion } from "../utils/helpers";
import Dropdown from "./Dropdown";
import { SiteLogo } from "./Icons";

const Navbar = ({ teams }) => {
  const createMegaMenu = teamsArg => {
    let cols = [];
    return sortTeamsByDivion(teamsArg).reduce((rows, element, index) => {
      const [DivisionName, TeamsInComponents] = element;
      const { League: LeaugeName } = TeamsInComponents[0];
      cols.push(
        <MegaMenuDivision
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
              <NavLink exact to="/">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink exact to="/scores">
                Scores
              </NavLink>
            </li>
            <li>
              <NavLink exact to="/standings">
                Standings
              </NavLink>
            </li>
            <li>
              <NavLink exact to="/news">
                News
              </NavLink>
            </li>
            <li>
              <Dropdown Title="Teams" MenuItems={createMegaMenu(teams)} />
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

Navbar.propTypes = {
  teams: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Navbar;
