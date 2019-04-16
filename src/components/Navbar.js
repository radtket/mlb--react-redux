import React, { useReducer } from "react";
import { NavLink, Link } from "react-router-dom";
import PropTypes from "prop-types";
import MegaMenuDropdown, {
  DropdownReducer,
  initialState,
  DropdownContext,
} from "./MegaMenuDropdown";
import { SiteLogo } from "./Icons";

const Navbar = ({ teams }) => {
  const [state, dispatch] = useReducer(DropdownReducer, initialState);

  return (
    <header className="header">
      <div className="container header__inner">
        <figure className="header__logo">
          <Link to="/" onClick={() => dispatch("reset")}>
            <SiteLogo />
          </Link>
        </figure>

        <div className="header__nav">
          <ul>
            <li>
              <NavLink exact to="/" onClick={() => dispatch("reset")}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink exact to="/scores" onClick={() => dispatch("reset")}>
                Scores
              </NavLink>
            </li>
            <li>
              <NavLink exact to="/standings" onClick={() => dispatch("reset")}>
                Standings
              </NavLink>
            </li>
            <li>
              <NavLink exact to="/news" onClick={() => dispatch("reset")}>
                News
              </NavLink>
            </li>
            <li>
              <NavLink exact to="/stats" onClick={() => dispatch("reset")}>
                Stats
              </NavLink>
            </li>
            <li>
              <DropdownContext.Provider value={{ state, dispatch }}>
                <MegaMenuDropdown teams={teams} />
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
