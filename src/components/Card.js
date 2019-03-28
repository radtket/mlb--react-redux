import React from "react";
import PropTypes from "prop-types";

const Card = ({ title, body, style }) => {
  return (
    <div className="card" style={{ ...style }}>
      <h5 className="card__headline">{title}</h5>
      {body}
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string,
  body: PropTypes.element,
  style: PropTypes.object,
};

Card.defaultProps = {
  title: null,
  body: null,
  style: null,
};

export default Card;
