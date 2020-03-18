import React from "react";
import PropTypes from "prop-types";
import { format } from "date-fns";

const TicketedEventTime = ({ DateOfEvent }) => {
  return (
    <time
      className="event-ticket__date"
      dateTime={format(DateOfEvent, "YYYY-MM-DD HH:mm")}
    >
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
  );
};

TicketedEventTime.propTypes = {
  DateOfEvent: PropTypes.instanceOf(Date).isRequired,
};

export default TicketedEventTime;
