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
      <TicketedEventHeader
        datetime_local={datetime_local}
        performers={performers}
        url={url}
      />
      <div className="container aligner aligner__center--vertical">
        <TicketedEventTime DateOfEvent={new Date(datetime_local)} />
        <TicketedEventDetails
          {...venue}
          DateOfEvent={new Date(datetime_local)}
          title={title}
          url={url}
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
