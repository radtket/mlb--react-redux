import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
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
        rows.push(<Row key={LeaugeName}>{cols}</Row>);
        cols = [];
      }
      return rows;
    }, []);
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
