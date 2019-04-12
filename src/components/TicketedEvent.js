/* eslint-disable camelcase */
import React from "react";
import PropTypes from "prop-types";
import { format } from "date-fns";

const TicketedEvent = ({ datetime_local, stats, title, url, venue }) => {
  const {
    display_location: VenueLocation,
    name: VenueName,
    url: VenueUrl,
  } = venue;

  const { lowest_price, visible_listing_count } = stats;

  const DateOfEvent = new Date(datetime_local);

  const isAlmostSoldOut =
    visible_listing_count < 100 && visible_listing_count !== 0;

  return (
    <article className="event-ticket">
      <div className="container">
        <time
          dateTime={format(DateOfEvent, "YYYY-MM-DD HH:mm")}
          className="event-ticket__date">
          <span className="event-ticket__date--month">
            <span className="event-ticket__date--month-name">
              {format(DateOfEvent, "MMM")}
            </span>
            <span className="event-ticket__date--month-day-of">
              {format(DateOfEvent, "D")}
            </span>
          </span>
          <span className="event-ticket__date--week">
            {format(DateOfEvent, "ddd")}
          </span>
        </time>

        <div className="event-ticket__info">
          <h2 className="event-ticket__title">
            <a href={url} target="_blank" rel="noopener noreferrer">
              {title}
            </a>
          </h2>
          <ul className="event-ticket__details">
            <li>
              <time>{format(DateOfEvent, "h:mm A")}</time>
            </li>
            <li>
              <a href={VenueUrl} target="_blank" rel="noopener noreferrer">
                {VenueName}
              </a>
            </li>
            <li>{VenueLocation}</li>
          </ul>
        </div>

        <div className="event-ticket__pricing">
          <dl>
            <dt>From</dt>
            <dd className="event-ticket__pricing--price">${lowest_price}</dd>
          </dl>
          {isAlmostSoldOut && <span>{visible_listing_count} tickets left</span>}
        </div>
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
