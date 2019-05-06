import { handleErrors, slugify } from "../../utils/helpers";

export const FETCH_TICKETS_BEGIN = "FETCH_TICKETS_BEGIN";
export const FETCH_TICKETS_SUCCESS = "FETCH_TICKETS_SUCCESS";
export const FETCH_TICKETS_FAILURE = "FETCH_TICKETS_FAILURE";

export const fetchTicketsBegin = () => ({
  type: FETCH_TICKETS_BEGIN,
});

export const fetchTicketsSuccess = tickets => ({
  type: FETCH_TICKETS_SUCCESS,
  payload: { tickets },
});

export const fetchTicketsFailure = ticketsFail => ({
  type: FETCH_TICKETS_FAILURE,
  payload: { ticketsFail },
});

// `https://api.seatgeek.com/2/events?datetime_utc.gt=2019-05-14&performers.slug=washington-nationals&performers.slug=new-york-mets&client_id=
// `;

function getTicketsOnDate(date = "2019-05-14", sport = "mlb") {
  return fetch(
    `https://api.seatgeek.com/2/events?taxonomies.name=${sport}&datetime_utc.gt=${date}&client_id=${
      process.env.REACT_APP_SEATGEEK_API_KEY
    }`
  )
    .then(handleErrors)
    .then(res => res.json());
}

export function fetchTicketsOnDate(date) {
  return dispatch => {
    dispatch(fetchTicketsBegin());
    return getTicketsOnDate(date)
      .then(data => {
        dispatch(fetchTicketsSuccess(data.events));
        return data.events;
      })
      .catch(error => dispatch(fetchTicketsFailure(error)));
  };
}

function getTickets(teamName) {
  const teamQuery = slugify(teamName);
  return fetch(
    `https://api.seatgeek.com/2/events?performers.slug=${teamQuery}&client_id=${
      process.env.REACT_APP_SEATGEEK_API_KEY
    }`
  )
    .then(handleErrors)
    .then(res => res.json());
}

export function fetchTickets(teamName) {
  return dispatch => {
    dispatch(fetchTicketsBegin());
    return getTickets(teamName)
      .then(data => {
        dispatch(fetchTicketsSuccess(data.events));
        return data.events;
      })
      .catch(error => dispatch(fetchTicketsFailure(error)));
  };
}
