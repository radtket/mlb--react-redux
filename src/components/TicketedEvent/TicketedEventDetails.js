import React from "react";
import { format } from "date-fns";
import PropTypes from "prop-types";

const TicketedEventDetails = ({
  title,
  url,
  display_location: VenueLocation,
  name: VenueName,
  url: VenueUrl,
  DateOfEvent,
}) => {
  return (
    <div className="event-ticket__info aligner__grow">
      <h2 className="event-ticket__title">
        <a href={url} rel="noopener noreferrer" target="_blank">
          {title}
        </a>
      </h2>
      <ul className="event-ticket__details">
        <li>
          <time>{format(DateOfEvent, "h:mm A")}</time>
        </li>
        <li>
          <a href={VenueUrl} rel="noopener noreferrer" target="_blank">
            {VenueName}
          </a>
        </li>
        <li>{VenueLocation}</li>
      </ul>
    </div>
  );
};

TicketedEventDetails.propTypes = {
  DateOfEvent: PropTypes.instanceOf(Date).isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  display_location: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default TicketedEventDetails;
