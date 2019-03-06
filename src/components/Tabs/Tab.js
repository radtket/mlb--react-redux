import React, { Component } from "react";
import PropTypes from "prop-types";

class Tab extends Component {
  static propTypes = {
    activeTab: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  onClick = () => {
    const { label, onClick } = this.props;
    onClick(label);
  };

  render() {
    const {
      onClick,
      props: { activeTab, label, itemWidth },
    } = this;

    let className = "tabs-item";

    if (activeTab === label) {
      className += " is-selected";
    }

    return (
      <li
        className={className}
        onClick={onClick}
        style={{ width: `${itemWidth || "auto"}` }}>
        {label}
      </li>
    );
  }
}

export default Tab;
