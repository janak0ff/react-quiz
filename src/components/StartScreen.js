// This component is responsible for rendering the start screen of the quiz.
// It displays a heading, a brief description of the quiz, and a button to start the quiz.

import { useQuiz } from "../contexts/QuizContext";

// The StartScreen component is a functional component, meaning it uses the "function" keyword.
function StartScreen() {
  // The useQuiz hook returns the current state and dispatch function from the QuizContext.
  // The state and dispatch function are used to update the quiz state.
  const { numQuestions, dispatch } = useQuiz();

  // The component returns a JSX element that represents the start screen.
  // The JSX element contains a heading, a description, and a button to start the quiz.
  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>{numQuestions} questions to test your React mastery</h3>
      <button
        className="btn btn-ui"
        // When the button is clicked, the dispatch function is called with an object containing the "type" property set to "start".
        // This triggers the start action in the reducer, which updates the quiz state to "ready".
        onClick={() => dispatch({ type: "start" })}
      >
        Let's start
      </button>
    </div>
  );
}

// The StartScreen component is exported as the default export from this file.
export default StartScreen;
