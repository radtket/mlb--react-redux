import React from "react";
import PropTypes from "prop-types";
import { DefualtAvatar } from "../../utils/helpers";

const DepthChartPlayerImage = ({
  FirstName,
  LastName,
  PhotoUrl,
  PrimaryColor,
  SecondaryColor,
  QuaternaryColor,
  style,
}) => {
  return (
    <article
      className="depth-chart__position--image"
      alt={`${FirstName} ${LastName}`}
      style={{
        background: `url("${PhotoUrl || DefualtAvatar}"), #${SecondaryColor ||
          PrimaryColor ||
          QuaternaryColor} no-repeat`,
        backgroundSize: "85%",
        backgroundPosition: "1px center",
        ...style,
      }}
    />
  );
};

DepthChartPlayerImage.propTypes = {
  FirstName: PropTypes.string,
  LastName: PropTypes.string,
  PhotoUrl: PropTypes.string,
  PrimaryColor: PropTypes.string,
  SecondaryColor: PropTypes.string,
  QuaternaryColor: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.object,
};

DepthChartPlayerImage.defaultProps = {
  FirstName: "",
  LastName: "",
  PhotoUrl: "",
  PrimaryColor: "",
  SecondaryColor: "",
  QuaternaryColor: "",
  style: null,
};

export default DepthChartPlayerImage;
