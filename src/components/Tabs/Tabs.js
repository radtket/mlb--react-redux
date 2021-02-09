import React, { useState } from "react";
import PropTypes from "prop-types";

import Tab from "./Tab";

const Tabs = ({ itemWidth, data }) => {
  const [defaultActive] = Object.keys(data);
  const [activeIndex, setActiveIndex] = useState(defaultActive);

  return (
    <div className="tabs">
      <nav>
        {Object.keys(data).map(label => {
          return (
            <Tab
              key={label}
              isActive={activeIndex === label}
              itemWidth={itemWidth}
              label={label}
              onClick={() => setActiveIndex(label)}
            />
          );
        })}
      </nav>
      <div className="tab-content">{data[activeIndex]}</div>
    </div>
  );
};

Tabs.propTypes = {
  children: PropTypes.instanceOf(Array).isRequired,
  itemWidth: PropTypes.string,
};

Tabs.defaultProps = {
  itemWidth: "auto",
};

export default Tabs;
