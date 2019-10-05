import React, { useState } from "react";
import PropTypes from "prop-types";

import Tab from "./Tab";

const Tabs = ({ children, itemWidth }) => {
  const [FirstTab] = children;
  const [activeTab, setActiveTab] = useState(FirstTab.props.label);
  return (
    <div className="tabs">
      <nav>
        {children.map(({ props: { label } }) => {
          return (
            <Tab
              key={label}
              activeTab={activeTab}
              itemWidth={itemWidth}
              label={label}
              onClick={e => setActiveTab(e)}
            />
          );
        })}
      </nav>
      <div className="tab-content">
        {children.map(({ props }) => {
          const { children: kids, label } = props;
          if (label !== activeTab) {
            return undefined;
          }
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
