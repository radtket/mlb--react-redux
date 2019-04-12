import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const DepthPlayerLink = styled(Link)`
  color: ${({ theme }) => `#${theme.PrimaryColor}`};
`;

const DepthChartPlayerListItem = ({ playerObj, FormatedName, hasPlayerId }) => {
  if (!hasPlayerId) {
    return <>{FormatedName}</>;
  }

  return (
    <DepthPlayerLink to={`/player/${playerObj.PlayerID}`}>
      {FormatedName}
    </DepthPlayerLink>
  );
};

DepthChartPlayerListItem.propTypes = {
  hasPlayerId: PropTypes.bool,
  FormatedName: PropTypes.string.isRequired,
  playerObj: PropTypes.shape({
    PlayerID: PropTypes.number,
  }),
};

DepthChartPlayerListItem.defaultProps = {
  playerObj: PropTypes.null,
  hasPlayerId: false,
};

export default DepthChartPlayerListItem;
