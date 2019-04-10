import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const DepthChartPlayerListItem = ({
  PrimaryColor,
  playerObj,
  FormatedName,
  hasPlayerId,
}) => {
  if (!hasPlayerId) {
    return <>{FormatedName}</>;
  }

  return (
    <Link
      style={{ color: `#${PrimaryColor}` }}
      to={`/player/${playerObj.PlayerID}`}>
      {FormatedName}
    </Link>
  );
};

DepthChartPlayerListItem.propTypes = {
  hasPlayerId: PropTypes.bool,
  FormatedName: PropTypes.string.isRequired,
  playerObj: PropTypes.shape({
    PlayerID: PropTypes.number,
  }),
  PrimaryColor: PropTypes.string,
};

DepthChartPlayerListItem.defaultProps = {
  playerObj: PropTypes.null,
  PrimaryColor: "000",
  hasPlayerId: false,
};

export default DepthChartPlayerListItem;
