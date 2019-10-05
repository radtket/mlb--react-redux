import React, { useReducer } from "react";
import { NavLink, Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
  DropdownContext,
  DropdownReducer,
  initialState,
  MegaMenuDropdown,
} from "./MegaMenu";
import { SiteLogo } from "./Icons";

const Navbar = ({ teams }) => {
  const [state, dispatch] = useReducer(DropdownReducer, initialState);

  return (
    <header className="header">
      <div className="container header__inner">
        <figure className="header__logo">
          <Link onClick={() => dispatch("reset")} to="/">
            <SiteLogo />
          </Link>
        </figure>

        <div className="header__nav">
          <ul>
            <li>
              <NavLink exact onClick={() => dispatch("reset")} to="/">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink exact onClick={() => dispatch("reset")} to="/scores">
                Scores
              </NavLink>
            </li>
            <li>
              <NavLink exact onClick={() => dispatch("reset")} to="/standings">
                Standings
              </NavLink>
            </li>
            <li>
              <NavLink exact onClick={() => dispatch("reset")} to="/news">
                News
              </NavLink>
            </li>
            <li>
              <NavLink exact onClick={() => dispatch("reset")} to="/schedule">
                Schedule
              </NavLink>
            </li>
            <li>
              <NavLink exact onClick={() => dispatch("reset")} to="/stats">
                Stats
              </NavLink>
            </li>
            <li>
              <DropdownContext.Provider value={{ state, dispatch }}>
                <MegaMenuDropdown {...{ teams }} />
              </DropdownContext.Provider>
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
