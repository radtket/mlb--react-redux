import React from "react";
import { push } from "connected-react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  increment,
  incrementAsync,
  decrement,
  decrementAsync,
} from "../modules/counter/actions";

const Counters = () => {
  const dispatch = useDispatch();
  const { count, isIncrementing, isDecrementing } = useSelector(state => ({
    ...state.counter,
  }));

  return (
    <div>
      <h1>Counters</h1>
      <p>Count: {count}</p>

      <p>
        <button onClick={() => dispatch(increment())} type="button">
          Increment
        </button>
        <button
          disabled={isIncrementing}
          onClick={() => dispatch(incrementAsync())}
          type="button"
        >
          Increment Async
        </button>
      </p>

      <p>
        <button onClick={() => dispatch(decrement())} type="button">
          Decrement
        </button>
        <button
          disabled={isDecrementing}
          onClick={() => dispatch(decrementAsync())}
          type="button"
        >
          Decrement Async
        </button>
      </p>

      <p>
        <button onClick={() => dispatch(push("/teams"))} type="button">
          Go to teams page via redux
        </button>
      </p>
    </div>
  );
};

export default Counters;
