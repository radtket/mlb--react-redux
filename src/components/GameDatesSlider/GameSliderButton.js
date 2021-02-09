import React from "react";
import { format } from "date-fns";
import PropTypes from "prop-types";
import classnames from "classnames";

const GameSliderButton = ({ activeTab, label, setActiveTab }) => {
  return (
    <button
      className={classnames("tabs-item", {
        "is-selected": activeTab === label,
      })}
      onClick={() => setActiveTab(label)}
      type="button"
    >
      <h3>{format(label, "MMM")}</h3>
      <h1>{format(label, "D")}</h1>
    </button>
  );
};

GameSliderButton.propTypes = {
  label: PropTypes.string.isRequired,
  activeTab: PropTypes.string.isRequired,
  setActiveTab: PropTypes.func.isRequired,
};

export default GameSliderButton;
