import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchTickets } from "../../../modules/ticket/actions";
import TicketedEvent from "../../../components/TicketedEvent";

const PageTeamTickets = ({
  ticketsFail,
  ticketsLoading,
  tickets,
  fetchTickets: getTickets,
  Name,
  City,
}) => {
  useEffect(() => {
    getTickets(`${City} ${Name}`);
  }, []);
  if (ticketsFail) {
    return <div>Error! {ticketsFail.message}</div>;
  }

  if (ticketsLoading) {
    return <div>Loading...</div>;
  }

  const renderEvents = events => {
    return events.map(event => <TicketedEvent key={event.id} {...event} />);
  };

  return <>{tickets && renderEvents(tickets)}</>;
};

PageTeamTickets.propTypes = {
  ticketsFail: null || PropTypes.bool,
  ticketsLoading: PropTypes.bool.isRequired,
  tickets: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchTickets: PropTypes.func.isRequired,
  Name: PropTypes.string.isRequired,
  City: PropTypes.string.isRequired,
};

PageTeamTickets.defaultProps = {
  ticketsFail: null,
};

const mapStateToProps = ({ tickets }) => ({
  tickets: tickets.ticketsData,
  ticketsLoading: tickets.ticketsLoading,
  ticketsFail: tickets.ticketsError,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchTickets,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { pure: false }
)(PageTeamTickets);
