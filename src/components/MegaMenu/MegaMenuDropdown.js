import React, { useContext, createContext } from "react";
import PropTypes from "prop-types";
import { IconCaret } from "../Icons";
// import { DropdownContext } from "./Navbar";
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

const CreateMegaMenu = ({ teams }) => {
  let cols = [];
  return sortTeamsByDivion(teams).reduce((rows, element, index) => {
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
        <div key={LeaugeName} className="row">
          {cols}
        </div>
      );
      cols = [];
    }
    return rows;
  }, []);
};

export const MegaMenuDropdown = ({ teams }) => {
  const { state, dispatch } = useContext(DropdownContext);
  const { isOpen } = state;

  return (
    <>
      <button
        className="dropdown__button"
        onClick={() => dispatch("toggle")}
        type="button">
        Teams
        <IconCaret />
      </button>
      {isOpen && (
        <div className="dropdown__content">
          <CreateMegaMenu {...{ teams }} />
        </div>
      )}
    </>
  );
};

MegaMenuDropdown.propTypes = {
  teams: PropTypes.arrayOf(PropTypes.object).isRequired,
};
