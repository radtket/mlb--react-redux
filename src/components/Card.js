import React from "react";
import PropTypes from "prop-types";

const Card = ({ title, body, ...props }) => {
  return (
    <div className="card" {...props}>
      <h5 className="card__headline">{title}</h5>
      {body}
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string,
  body: PropTypes.element,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.object,
};

Card.defaultProps = {
  title: null,
  body: null,
  style: null,
};

export default Card;
