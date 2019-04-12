/* eslint-disable camelcase */
import React from "react";
import PropTypes from "prop-types";
import TicketedEventDetails from "./TicketedEventDetails";
import TicketedEventTime from "./TicketedEventTime";
import TicketedEventPricing from "./TicketedEventPricing";

const TicketedEvent = ({ datetime_local, stats, title, url, venue }) => {
  return (
    <article className="event-ticket">
      <div className="container">
        <TicketedEventTime DateOfEvent={new Date(datetime_local)} />
        <TicketedEventDetails
          {...venue}
          url={url}
          title={title}
          DateOfEvent={new Date(datetime_local)}
        />
        <TicketedEventPricing {...stats} />
      </div>
    </article>
  );
};

TicketedEvent.propTypes = {
  datetime_local: PropTypes.string.isRequired,
  stats: PropTypes.shape({
    lowest_price: PropTypes.number,
    visible_listing_count: PropTypes.number,
  }).isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  venue: PropTypes.shape({
    display_location: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default TicketedEvent;
