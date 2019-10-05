import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { DefualtAvatar } from "../../utils/helpers";

const DepthChartPlayerImage = ({ FirstName, LastName, PhotoUrl, style }) => {
  const DepthChartImage = styled.article`
    background-image: url("${() => `${PhotoUrl || DefualtAvatar}`}");
    background-size: 85%;
    background-position: 1px center;
`;

  return (
    <DepthChartImage
      alt={`${FirstName} ${LastName}`}
      className="depth-chart__position--image"
      style={{
        ...style,
      }}
    />
  );
};

DepthChartPlayerImage.propTypes = {
  FirstName: PropTypes.string,
  LastName: PropTypes.string,
  PhotoUrl: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.object,
};

DepthChartPlayerImage.defaultProps = {
  FirstName: "",
  LastName: "",
  PhotoUrl: "",
  style: null,
};

export default DepthChartPlayerImage;
