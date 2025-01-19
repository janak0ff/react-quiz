// Import the useQuiz hook from QuizContext to access quiz state and dispatch function
import { useQuiz } from "../contexts/QuizContext";

// Define a React functional component named NextButton
function NextButton() {
  // Destructure dispatch, answer, index, and numQuestions from the useQuiz hook
  // dispatch: function to dispatch actions to update the quiz state
  // answer: current answer status, null if not answered
  // index: current question index
  // numQuestions: total number of questions in the quiz
  const { dispatch, answer, index, numQuestions } = useQuiz();

  // If no answer has been given, return null to render nothing
  if (answer === null) return null;

  // If the current question is not the last one, render a "Next" button
  if (index < numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        // On button click, dispatch nextQuestion action to move to the next question
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    );

  // If the current question is the last one, render a "Finish" button
  if (index === numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        // On button click, dispatch finish action to complete the quiz
        onClick={() => dispatch({ type: "finish" })}
      >
        Finish
      </button>
    );
}

// Export the NextButton component as the default export of this module
export default NextButton;
