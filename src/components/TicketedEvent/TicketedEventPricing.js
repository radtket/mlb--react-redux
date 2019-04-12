/* eslint-disable camelcase */
import React from "react";
import PropTypes from "prop-types";

const TicketedEventPricing = ({ lowest_price, visible_listing_count }) => {
  return (
    <div className="event-ticket__pricing">
      <dl>
        <dt>From</dt>
        <dd className="event-ticket__pricing--price">${lowest_price}</dd>
      </dl>
      {visible_listing_count < 100 && visible_listing_count !== 0 && (
        <span>{visible_listing_count} tickets left</span>
      )}
    </div>
  );
};

TicketedEventPricing.propTypes = {
  lowest_price: PropTypes.number,
  visible_listing_count: PropTypes.number,
};

TicketedEventPricing.defaultProps = {
  lowest_price: null,
  visible_listing_count: null,
};

export default TicketedEventPricing;
