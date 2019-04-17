import React from "react";
import PropTypes from "prop-types";
import Dropdown from "react-dropdown";

const Picker = ({ value, onChange, options }) => {
  return (
    <span>
      <h1>{value}</h1>
      <Dropdown
        options={options.reduce((all, one) => {
          all.push({
            value: one,
            label: one,
          });
          return all;
        }, [])}
        onChange={e => onChange(e.value)}
        placeholder={value}
      />
    </span>
  );
};

export default Picker;

Picker.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
