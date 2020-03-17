import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { fetchTickets } from "../../../modules/actions";
import TicketedEvent from "../../../components/TicketedEvent";
import LoadingSpinner from "../../../components/LoadingSpinner";
import ErrorMessage from "../../../components/ErrorMessage";

const PageTeamTickets = ({ Name, City }) => {
  const dispatch = useDispatch();

  const { ticketsData, ticketsLoading, ticketsError } = useSelector(
    state => state.tickets
  );

  useEffect(() => {
    dispatch(fetchTickets(`${City} ${Name}`)());
  }, [City, Name, dispatch]);

  if (ticketsError) {
    return <ErrorMessage error={ticketsError} />;
  }

  if (ticketsLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container">
      <div className="col-sm-7">
        {ticketsData.map(event => (
          <TicketedEvent key={event.id} {...event} />
        ))}
      </div>
    </div>
  );
};

PageTeamTickets.propTypes = {
  Name: PropTypes.string.isRequired,
  City: PropTypes.string.isRequired,
};

export default PageTeamTickets;
