import React from "react";
import PropTypes from "prop-types";

const TableVenueCell = ({ name, city, state }) => (
  <td>
    <strong>{name}</strong>
    {` ${city}, ${state}`}
  </td>
);

TableVenueCell.propTypes = {
  name: PropTypes.string,
  city: PropTypes.string,
  state: PropTypes.string,
};

TableVenueCell.defaultProps = {
  name: "",
  city: "",
  state: "",
};

export default TableVenueCell;
