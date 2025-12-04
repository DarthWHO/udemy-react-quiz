import { useReducer } from "react";

function reducer(state, action) {
  console.log(state);

  switch (action.type) {
    case "inc":
      return { ...state, count: state.count + state.step, step: state.step };
    case "dec":
      return { ...state, count: state.count - state.step, step: state.step };
    case "define":
      return { ...state, count: action.payload, step: state.step };
    case "reset":
      return { ...state, count: 0, step: 1 };
    default:
      throw new Error("Unknown action type");
  }
}

function DateCounter() {
  const initialState = { count: 0, step: 1 };
  const [state, dispatch] = useReducer(reducer, initialState);
  const { count, step } = state;

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const dec = function () {
    // setCount((count) => count - 1);
    dispatch({ type: "dec" });
  };

  const inc = function () {
    // setCount((count) => count + 1);
    dispatch({ type: "inc" });
  };

  const defineCount = function (e) {
    dispatch({ type: "define", payload: Number(e.target.value) });
  };

  const defineStep = function (e) {
    dispatch({ type: "defineStep", payload: Number(e.target.value) });
  };

  const reset = function () {
    dispatch({ type: "reset", payload: 0 });
    setStep(1);
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
