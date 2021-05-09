import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const DepthPlayerLink = styled(Link)`
  color: ${({ theme }) => `${theme.PrimaryColor}`};

  &:hover {
    color: ${({ theme }) => `${theme.PrimaryColorHover}`};
  }
`;

const DepthChartPlayerListItem = ({ PlayerID, FormatedName }) => {
  if (!PlayerID) {
    return FormatedName;
  }

  return (
    <DepthPlayerLink to={`/player/${PlayerID}`}>{FormatedName}</DepthPlayerLink>
  );
};

DepthChartPlayerListItem.propTypes = {
  FormatedName: PropTypes.string.isRequired,
  PlayerID: PropTypes.number,
};

DepthChartPlayerListItem.defaultProps = {
  PlayerID: null,
};

export default DepthChartPlayerListItem;
