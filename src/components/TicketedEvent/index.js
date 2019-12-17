/* eslint-disable camelcase */
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import TicketedEventDetails from "./TicketedEventDetails";
import TicketedEventTime from "./TicketedEventTime";
import TicketedEventPricing from "./TicketedEventPricing";
import TicketedEventHeader from "./TicketedEventHeader";

const TicketedEventStyles = styled.article`
  a {
    color: ${({ theme }) => `${theme.PrimaryColor}`};
  }
  .event-ticket__date--month {
    color: ${({ theme }) => `${theme.SecondaryColor}`};
  }
`;

const TicketedEvent = ({
  datetime_local,
  stats,
  title,
  url,
  venue,
  performers,
}) => {
  return (
    <TicketedEventStyles className="card event-ticket">
      <TicketedEventHeader {...{ url, performers, datetime_local }} />
      <div className="container aligner aligner__center--vertical">
        <TicketedEventTime DateOfEvent={new Date(datetime_local)} />
        <TicketedEventDetails
          {...{ ...venue, title, url }}
          DateOfEvent={new Date(datetime_local)}
        />
        <TicketedEventPricing {...stats} />
      </div>
    </TicketedEventStyles>
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
  performers: PropTypes.arrayOf(PropTypes.object),
};

TicketedEvent.defaultProps = {
  performers: null,
};

export default TicketedEvent;
