import React, { Component } from "react";
import PropTypes from "prop-types";

import Tab from "./Tab";

class Tabs extends Component {
  static propTypes = {
    children: PropTypes.instanceOf(Array).isRequired,
  };

  constructor(props) {
    super(props);

    const { children } = this.props;
    const [FirstTab] = children;

    this.state = {
      activeTab: FirstTab.props.label,
    };
  }

  onClickTabItem = tab => {
    this.setState({ activeTab: tab });
  };

  render() {
    const {
      onClickTabItem,
      props: { children, itemWidth },
      state: { activeTab },
    } = this;

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
                onClick={onClickTabItem}
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
  }
}

export default Tabs;
