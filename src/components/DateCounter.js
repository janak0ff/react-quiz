import { useReducer } from "react";

// Initial state for the reducer
const initialState = { count: 0, step: 1 };

// Reducer function
function reducer(state, action) {
  // console.log(state, action);

  // Switch statement to handle different actions
  switch (action.type) {
    // Decrease the count by the step
    case "dec":
      return { ...state, count: state.count - state.step };
    // Increase the count by the step
    case "inc":
      return { ...state, count: state.count + state.step };
    // Set the count to the payload value
    case "setCount":
      return { ...state, count: action.payload };
    // Set the step to the payload value
    case "setStep":
      return { ...state, step: action.payload };
    // Reset the state to the initial state
    case "reset":
      return initialState;
    // Default case to handle unknown actions
    default:
      throw new Error("Unknown action");
  }
}

// DateCounter component
function DateCounter() {
  // Use the useReducer hook to create a state and dispatch function
  const [state, dispatch] = useReducer(reducer, initialState);

  // Destructure the state to get the count and step
  const { count, step } = state;

  // Create a date object with the count added to it
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  // Decrement the count
  const dec = function () {
    dispatch({ type: "dec" });
  };

  // Increment the count
  const inc = function () {
    dispatch({ type: "inc" });
  };

  // Set the count to the value of the input
  const defineCount = function (e) {
    dispatch({ type: "setCount", payload: Number(e.target.value) });
  };

  // Set the step to the value of the input
  const defineStep = function (e) {
    dispatch({ type: "setStep", payload: Number(e.target.value) });
  };

  // Reset the state
  const reset = function () {
    dispatch({ type: "reset" });
  };

  // Return the JSX for the component
  return (
    <div className="counter">
      {/* Step input range */}
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

      {/* Count input and increment/decrement buttons */}
      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      {/* Date display */}
      <p>{date.toDateString()}</p>

      {/* Reset button */}
      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}

// Export the DateCounter component
export default DateCounter;
