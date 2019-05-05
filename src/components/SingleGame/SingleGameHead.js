import React from "react";
import PropTypes from "prop-types";
import { getNumberWithOrdinal, inningHalfDecoder } from "../../utils/helpers";

const SingleGameHead = ({
  GameIsScheduled,
  IsClosed,
  Status,
  InningHalf,
  Inning,
}) => {
  return (
    <thead>
      <tr>
        <th className="date-time">
          {!GameIsScheduled && Status}
          {!IsClosed && GameIsScheduled
            ? `${inningHalfDecoder(InningHalf)} ${getNumberWithOrdinal(Inning)}`
            : ""}
        </th>
        <th className="score">R</th>
        <th className="score">H</th>
        <th className="score">E</th>
      </tr>
    </thead>
  );
};

SingleGameHead.propTypes = {
  GameIsScheduled: PropTypes.bool,
  IsClosed: PropTypes.bool,
  Status: PropTypes.string,
  InningHalf: PropTypes.string,
  Inning: PropTypes.number,
};

SingleGameHead.defaultProps = {
  GameIsScheduled: null,
  IsClosed: null,
  Status: null,
  InningHalf: null,
  Inning: null,
};

export default SingleGameHead;
