/* eslint-disable camelcase */
import React from "react";
import PropTypes from "prop-types";

const TicketedEvent = props => {
  const { short_title } = props;
  return (
    <div>
      <h1>{short_title}</h1>
    </div>
  );
};

TicketedEvent.propTypes = {
  short_title: PropTypes.string.isRequired,
};

export default TicketedEvent;
