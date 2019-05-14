import React, { useContext, createContext } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { MegaMenuDivision } from ".";
import { sortTeamsByDivion } from "../../utils/helpers";

export const DropdownContext = createContext();

export const initialState = {
  count: 0,
  isOpen: false,
};

export const DropdownReducer = (state, action) => {
  switch (action) {
    case "toggle":
      return { ...state, isOpen: !state.isOpen };
    case "reset":
      return initialState;
    default:
      throw new Error("Unexpected action");
  }
};

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

export const MegaMenuDropdown = ({ teams, LinkLabel = "MLB" }) => {
  const { state, dispatch } = useContext(DropdownContext);
  const { isOpen } = state;

  return (
    <>
      <button
        className={`dropdown__button ${
          isOpen ? "dropdown__button__is-open" : ""
        }`}
        type="button"
        onClick={() => dispatch("toggle")}>
        <span>{LinkLabel}</span>
      </button>
      {isOpen && (
        <article className="row dropdown__wrap">
          <ul className="dropdown__primary">
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
              <NavLink exact to="/schedule" onClick={() => dispatch("reset")}>
                Schedule
              </NavLink>
            </li>
            <li>
              <NavLink exact to="/standings" onClick={() => dispatch("reset")}>
                Standings
              </NavLink>
            </li>
            <li>
              <NavLink exact to="/stats" onClick={() => dispatch("reset")}>
                Stats
              </NavLink>
            </li>
            <li>
              <NavLink exact to="/news" onClick={() => dispatch("reset")}>
                News
              </NavLink>
            </li>
            <li>
              <NavLink exact to="/teams" onClick={() => dispatch("reset")}>
                Teams
              </NavLink>
            </li>
          </ul>

          <div className="dropdown__content">{createMegaMenu(teams)}</div>
        </article>
      )}
    </>
  );
};

MegaMenuDropdown.propTypes = {
  teams: PropTypes.arrayOf(PropTypes.object).isRequired,
  LinkLabel: PropTypes.string,
};

MegaMenuDropdown.defaultProps = {
  LinkLabel: "MLB",
};
