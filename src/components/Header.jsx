import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import DivisionComponent from "./Navbar/MegaMenu/DivisionComponent";

class Header extends Component {
  sortTeamsByDivion = allTeams => {
    return Object.entries(
      allTeams.reduce((teams, team) => {
        const { League, Division } = team;
        const teamsSortedByDivision = teams;
        teamsSortedByDivision[`${League} ${Division}`] =
          teamsSortedByDivision[`${League} ${Division}`] || [];
        teamsSortedByDivision[`${League} ${Division}`].push(team);
        return teamsSortedByDivision;
      }, {})
    ).sort();
  };

  createMegaMenu = teams => {
    const rows = [];
    let cols = [];

    this.sortTeamsByDivion(teams).forEach((element, index) => {
      const [divisionName, divisionTeamsComponents] = element;
      cols.push(
        <DivisionComponent
          key={divisionName}
          DivisionName={divisionName}
          TeamsInDivision={divisionTeamsComponents}
        />
      );
      if ((index + 1) % 3 === 0) {
        rows.push(
          <div className="row" key={divisionTeamsComponents[0].League}>
            {cols}
          </div>
        );
        cols = [];
      }
    });

    return rows;
  };

  render() {
    const { teams } = this.props;
    return (
      <Navbar bg="primary" variant="dark" expand="lg">
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Link className="nav-link" to="/">
              Home
            </Link>
            <Link className="nav-link" to="/scores">
              Scores
            </Link>
            <NavDropdown title="Teams" id="basic-nav-dropdown">
              {teams && this.createMegaMenu(teams)}
            </NavDropdown>
            <Link className="nav-link" to="/standings">
              Standings
            </Link>
            <Link className="nav-link" to="/news">
              News
            </Link>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

Header.propTypes = {
  teams: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Header;
