import React, { useContext } from "react";
import PropTypes from "prop-types";
import { IconCaret } from "../Icons";
// import { DropdownContext } from "./Navbar";
import MegaMenuDivision from "./MegaMenuDivision";

import { sortTeamsByDivion } from "../../utils/helpers";
import DropdownContext from "./DropdownContext";

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
  return sortTeamsByDivion(teams).reduce(
    (rows, [DivisionName, TeamsInDivision], index) => {
      const { League } = TeamsInDivision[0];
      cols.push(
        <MegaMenuDivision
          key={DivisionName}
          {...{ TeamsInDivision, DivisionName }}
        />
      );
      if ((index + 1) % 3 === 0) {
        rows.push(
          <div key={League} className="row">
            {cols}
          </div>
        );
        cols = [];
      }
      return rows;
    },
    []
  );
};

export const MegaMenuDropdown = ({ teams }) => {
  const { state, dispatch } = useContext(DropdownContext);

  return (
    <>
      <button
        className="dropdown__button"
        onClick={() => dispatch("toggle")}
        type="button">
        Teams
        <IconCaret />
      </button>
      {state.isOpen && (
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
