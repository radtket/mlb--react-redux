import React from "react";
import PropTypes from "prop-types";
import { format } from "date-fns";
import { getNumberWithOrdinal, inningHalfDecoder } from "../../utils/helpers";

const SingleGameHead = ({
  Channel,
  DateTime,
  GameStatusFinal,
  GameStatusInProgress,
  GameStatusPregame,
  GameStatusScheduled,
  Inning,
  InningHalf,
  Status,
}) => {
  return (
    <thead>
      <tr>
        <th className="date-time">
          {!GameStatusScheduled && !GameStatusInProgress && Status}
          {!GameStatusPregame && GameStatusInProgress
            ? `${inningHalfDecoder(InningHalf)} ${getNumberWithOrdinal(Inning)}`
            : ""}
          {GameStatusPregame &&
            DateTime &&
            format(new Date(DateTime), "h:mm A")}
        </th>

        {GameStatusPregame && Channel && (
          <th className="network" colSpan="3">
            {Channel}
          </th>
        )}
        {(GameStatusInProgress || GameStatusFinal) && (
          <>
            <th className="score">R</th>
            <th className="score">H</th>
            <th className="score">E</th>
          </>
        )}
      </tr>
    </thead>
  );
};

SingleGameHead.propTypes = {
  Channel: PropTypes.string,
  DateTime: PropTypes.string,
  GameStatusFinal: PropTypes.bool,
  GameStatusInProgress: PropTypes.bool,
  GameStatusPregame: PropTypes.bool,
  GameStatusScheduled: PropTypes.bool,
  Inning: PropTypes.number,
  InningHalf: PropTypes.string,
  Status: PropTypes.string,
};

SingleGameHead.defaultProps = {
  Channel: null,
  DateTime: null,
  GameStatusFinal: null,
  GameStatusInProgress: null,
  GameStatusPregame: null,
  GameStatusScheduled: null,
  Inning: null,
  InningHalf: null,
  Status: null,
};

export default SingleGameHead;
