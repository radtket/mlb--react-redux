import React from "react";
import PropTypes from "prop-types";
import { push } from "connected-react-router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  increment,
  incrementAsync,
  decrement,
  decrementAsync,
} from "../modules/counter/actions";

const Counters = ({
  count,
  increment,
  incrementAsync,
  isIncrementing,
  decrement,
  decrementAsync,
  isDecrementing,
  changePage,
}) => {
  return (
    <div>
      <h1>Counters</h1>
      <p>Count: {count}</p>

      <p>
        <button onClick={increment} type="button">
          Increment
        </button>
        <button
          disabled={isIncrementing}
          onClick={incrementAsync}
          type="button"
        >
          Increment Async
        </button>
      </p>

      <p>
        <button onClick={decrement} type="button">
          Decrement
        </button>
        <button
          disabled={isDecrementing}
          onClick={decrementAsync}
          type="button"
        >
          Decrement Async
        </button>
      </p>

      <p>
        <button onClick={() => changePage()} type="button">
          Go to teams page via redux
        </button>
      </p>
    </div>
  );
};

Counters.propTypes = {
  changePage: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
  decrement: PropTypes.func.isRequired,
  decrementAsync: PropTypes.func.isRequired,
  increment: PropTypes.func.isRequired,
  incrementAsync: PropTypes.func.isRequired,
  isDecrementing: PropTypes.bool.isRequired,
  isIncrementing: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ counter }) => ({
  count: counter.count,
  isIncrementing: counter.isIncrementing,
  isDecrementing: counter.isDecrementing,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      increment,
      incrementAsync,
      decrement,
      decrementAsync,
      changePage: () => push("/teams/:teamAbrv"),
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Counters);
