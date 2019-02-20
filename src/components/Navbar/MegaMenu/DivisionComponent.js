import React from "react";
import Col from "react-bootstrap/Col";
import PropTypes from "prop-types";
import SingleTeam from "./SingleTeam";
import { propComparator } from "../../../utils/helpers";

const DivisionComponent = ({ DivisionName, TeamsInDivision }) => {
  return (
    <Col sm={4} key={DivisionName}>
      <h6>{DivisionName}</h6>
      <nav>
        {TeamsInDivision.sort(propComparator("City")).map(team => {
          const { TeamID } = team;
          return <SingleTeam key={TeamID} {...team} />;
        })}
      </nav>
    </Col>
  );
};

DivisionComponent.propTypes = {
  DivisionName: PropTypes.string.isRequired,
  TeamsInDivision: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default DivisionComponent;
