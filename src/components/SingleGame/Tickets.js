import React from "react";
import { TicketStubs } from "../Icons";

const Tickets = ({ url, stats, ...rest }) => {
  console.log({ url, stats, rest });
  return (
    <div className="scoreboard-detail__tickets">
      <TicketStubs />
      <a href={url} rel="noopener noreferrer" target="_blank">
        {`Tickets as low as $${stats.lowest_price}`}
      </a>
    </div>
  );
};

export default Tickets;
