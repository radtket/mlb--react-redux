import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchTickets } from "../../../modules/actions";
import TicketedEvent from "../../../components/TicketedEvent";
import LoadingSpinner from "../../../components/LoadingSpinner";

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
    return <LoadingSpinner />;
  }

  return (
    <div className="container">
      <div className="col-sm-7">
        {tickets &&
          tickets.map(event => <TicketedEvent key={event.id} {...event} />)}
      </div>
    </div>
  );
};

PageTeamTickets.propTypes = {
  ticketsFail: PropTypes.bool,
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

export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(PageTeamTickets);
