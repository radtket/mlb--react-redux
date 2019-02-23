import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import NavDropdown from "react-bootstrap/NavDropdown";
import DivisionComponent from "./MegaMenu/DivisionComponent";
import { sortTeamsByDivion } from "../../utils/helpers";

class Header extends Component {
  createMegaMenu = teams => {
    let cols = [];
    return sortTeamsByDivion(teams).reduce((rows, element, index) => {
      const [DivisionName, TeamsInComponents] = element;
      const { League: LeaugeName } = TeamsInComponents[0];
      cols.push(
        <DivisionComponent
          key={DivisionName}
          DivisionName={DivisionName}
          TeamsInDivision={TeamsInComponents}
        />
      );
      if ((index + 1) % 3 === 0) {
        rows.push(
          <div className="row" key={LeaugeName}>
            {cols}
          </div>
        );
        cols = [];
      }
      return rows;
    }, []);
  };

  render() {
    const { teams } = this.props;
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">
          Home
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/scores">
                Scores
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/standings">
                Standings
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/news">
                News
              </Link>
            </li>
            <NavDropdown title="Teams" id="basic-nav-dropdown">
              {teams && this.createMegaMenu(teams)}
            </NavDropdown>
          </ul>
        </div>
      </nav>
    );
  }
}

Header.propTypes = {
  teams: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Header;
