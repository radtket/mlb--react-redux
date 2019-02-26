/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
import React, { Component } from "react";
import { push } from "connected-react-router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  increment,
  incrementAsync,
  decrement,
  decrementAsync,
} from "../../modules/counter";

class Counters extends Component {
  render() {
    const {
      count,
      increment,
      incrementAsync,
      isIncrementing,
      decrement,
      decrementAsync,
      isDecrementing,
      changePage,
    } = this.props;
    return (
      <div>
        <h1>Counters</h1>
        <p>Count: {count}</p>

        <p>
          <button onClick={increment} type="button">
            Increment
          </button>
          <button
            onClick={incrementAsync}
            disabled={isIncrementing}
            type="button">
            Increment Async
          </button>
        </p>

        <p>
          <button onClick={decrement} type="button">
            Decrement
          </button>
          <button
            onClick={decrementAsync}
            disabled={isDecrementing}
            type="button">
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
  }
}

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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Counters);
