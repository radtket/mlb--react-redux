import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const Tab = ({ isActive, label, itemWidth, onClick }) => {
  return (
    <button
      className={classnames("tabs-item", {
        "is-selected": isActive,
      })}
      {...{ onClick }}
      style={{ width: `${itemWidth || "auto"}` }}
      type="button"
    >
      {label}
    </button>
  );
};

Tab.propTypes = {
  isActive: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  itemWidth: PropTypes.string,
};

Tab.defaultProps = {
  itemWidth: "auto",
};

export default Tab;
