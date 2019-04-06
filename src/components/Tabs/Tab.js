import React from "react";
import PropTypes from "prop-types";

const Tab = ({ activeTab, label, itemWidth, onClick }) => {
  return (
    <button
      className={`tabs-item ${activeTab === label ? "is-selected" : ""}`}
      onClick={() => {
        onClick(label);
      }}
      style={{ width: `${itemWidth || "auto"}` }}
      type="button">
      {label}
    </button>
  );
};

Tab.propTypes = {
  activeTab: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  itemWidth: PropTypes.string,
};

Tab.defaultProps = {
  itemWidth: "auto",
};

export default Tab;
