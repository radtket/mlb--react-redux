import React from "react";
import PropTypes from "prop-types";

const SingleGameBaseballDiamond = ({
  RunnerOnFirst,
  RunnerOnSecond,
  RunnerOnThird,
}) => {
  return (
    <figure className="mlb-icons">
      <ul
        className={`bases status base-${RunnerOnFirst ? 1 : 0}-${
          RunnerOnSecond ? 1 : 0
        }-${RunnerOnThird ? 1 : 0}`}>
        <li className="base base__second" />
        <li className="base base__third" />
        <li className="base base__first" />
      </ul>
    </figure>
  );
};

SingleGameBaseballDiamond.propTypes = {
  RunnerOnFirst: PropTypes.bool,
  RunnerOnSecond: PropTypes.bool,
  RunnerOnThird: PropTypes.bool,
};

SingleGameBaseballDiamond.defaultProps = {
  RunnerOnFirst: null,
  RunnerOnSecond: null,
  RunnerOnThird: null,
};

export default SingleGameBaseballDiamond;
