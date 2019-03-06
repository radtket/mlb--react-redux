import React, { Component } from "react";
import PropTypes from "prop-types";
import { IconCaret } from "./Icons";

class Dropdown extends Component {
  state = {
    showMenu: false,
  };

  openMenu = event => {
    event.preventDefault();

    this.setState({ showMenu: true }, () => {
      document.addEventListener("click", this.closeMenu);
    });
  };

  closeMenu = event => {
    if (!this.dropdownMenu.contains(event.target)) {
      this.setState({ showMenu: false }, () => {
        document.removeEventListener("click", this.closeMenu);
      });
    }
  };

  render() {
    const { showMenu } = this.state;
    const { MenuItems, Title } = this.props;
    return (
      <>
        <button
          className="dropdown__button"
          onClick={this.openMenu}
          type="button">
          {Title}
          <IconCaret />
        </button>
        {showMenu ? (
          <div
            className="dropdown__content"
            ref={element => {
              this.dropdownMenu = element;
            }}>
            {MenuItems}
          </div>
        ) : null}
      </>
    );
  }
}

Dropdown.propTypes = {
  Title: PropTypes.string.isRequired,
  MenuItems: PropTypes.node.isRequired,
};

export default Dropdown;
