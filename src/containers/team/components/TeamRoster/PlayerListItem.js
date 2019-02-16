import React from "react";
import PropTypes from "prop-types";

const PlayerListItem = ({ FirstName, LastName }) => {
  return (
    <li>
      {FirstName} {LastName}
    </li>
  );
};

PlayerListItem.propTypes = {
  FirstName: PropTypes.string.isRequired,
  LastName: PropTypes.string.isRequired
};

export default PlayerListItem;
