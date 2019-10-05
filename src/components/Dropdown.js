import React, { useState } from "react";
import PropTypes from "prop-types";
import { IconCaret } from "./Icons";

const Dropdown = ({ MenuItems, Title }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  return (
    <>
      <button
        className="dropdown__button"
        onClick={() => setMenuVisible(!menuVisible)}
        type="button">
        {Title}
        <IconCaret />
      </button>
      {menuVisible && <div className="dropdown__content">{MenuItems}</div>}
    </>
  );
};

Dropdown.propTypes = {
  Title: PropTypes.string.isRequired,
  MenuItems: PropTypes.node.isRequired,
};

export default Dropdown;
