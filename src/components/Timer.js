import { useEffect } from "react";
import { useQuiz } from "../contexts/QuizContext";

// Timer is a React component responsible for displaying a countdown timer
// and updating the seconds remaining in the quiz state.
function Timer() {
  // The useQuiz hook is used to access the seconds remaining in the quiz state
  // and the dispatch function to update the state.
  const { dispatch, secondsRemaining } = useQuiz();

  // The mins and seconds variables are used to format the time remaining
  // into minutes and seconds.
  const mins = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  // The useEffect hook is used to create an interval that updates the state
  // every second.
  useEffect(
    // This function is called once when the component mounts and
    // creates an interval that updates the state every second.
    function () {
      // The setInterval function is used to create an interval that
      // calls the dispatch function every second.
      const id = setInterval(function () {
        // The dispatch function is called with the "tick" action type
        // to update the secondsRemaining state.
        dispatch({ type: "tick" });
      }, 1000);

      // The return statement is used to clean up the interval when
      // the component unmounts.
      return () => clearInterval(id);
    },
    // The dependency array is used to specify that the effect should
    // only run when the dispatch function changes, which is when the
    // component mounts and unmounts.
    [dispatch]
  );

  // The JSX returned by the Timer component displays the time remaining
  // in the format "mm:ss".
  return (
    <div className="timer">
      {/* // The conditional expression is used to add a leading zero to the
      // minutes if it is less than 10. */}
      {mins < 10 && "0"}
      {mins}:{seconds < 10 && "0"}
      {seconds}
    </div>
  );
}

// The Timer component is exported as the default export.
export default Timer;
