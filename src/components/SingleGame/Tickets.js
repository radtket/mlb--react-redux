import React from "react";
import { TicketStubs } from "../Icons";

const Tickets = ({ gameTicket }) => {
  return (
    <div className="scoreboard-detail__tickets">
      <TicketStubs />
      <a href={gameTicket.url} rel="noopener noreferrer" target="_blank">
        {`Tickets as low as $${gameTicket.stats.lowest_price}`}
      </a>
    </div>
  );
};

export default Tickets;
