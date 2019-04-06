import React, { useState } from "react";
import PropTypes from "prop-types";

import Tab from "./Tab";

const Tabs = ({ children, itemWidth }) => {
  const [FirstTab] = children;
  const [activeTab, setActiveTab] = useState(FirstTab.props.label);
  return (
    <div className="tabs">
      <nav>
        {children.map(child => {
          const { label } = child.props;
          return (
            <Tab
              activeTab={activeTab}
              key={label}
              label={label}
              onClick={e => setActiveTab(e)}
              itemWidth={itemWidth}
            />
          );
        })}
      </nav>
      <div className="tab-content">
        {children.map(child => {
          const { children: kids, label } = child.props;
          if (label !== activeTab) return undefined;
          return kids;
        })}
      </div>
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
